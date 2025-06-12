import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ShoppingListItem } from './shopping-list-item.entity';
import { CreateShoppinListItemDto } from './dto/create-shopping-list-item.dto';
import { UpdateShoppingListItemDto } from './dto/update-shopping-list-item.dto';

@Injectable()
export class ShoppingListService {
    constructor(
        @InjectRepository(ShoppingListItem)
        private shoppingListItemRepository: Repository<ShoppingListItem>
    ) {}

    async create(createDto: CreateShoppinListItemDto, userId:string): Promise<ShoppingListItem> {
        const item = this.shoppingListItemRepository.create({ ...createDto, userId})
        return this.shoppingListItemRepository.save(item)
    }

    async findAll(userId: string): Promise<ShoppingListItem[]> {
        return this.shoppingListItemRepository.find({ where: {userId}})
    }

    async findOne(id: string, userId: string): Promise<ShoppingListItem> {
        const item = await this.shoppingListItemRepository.findOne({where: {id}})
        if(!item) {
            throw new NotFoundException('Item da lista de compras não encontrado.');
        }
        if (item.userId !== userId) {
            throw new UnauthorizedException('Voce não tem permissao para acessar este item')
        }
        return item;
    }

    async update(id: string, updateDto:UpdateShoppingListItemDto, userId: string): Promise <ShoppingListItem> {
        const item = await this.findOne(id, userId);
        Object.assign(item, updateDto)
        return this.shoppingListItemRepository.save(item)
    }

    async remove(id: string, userId: string): Promise<void> {
        const item = await this.findOne(id, userId);
        await this.shoppingListItemRepository.remove(item)
    }
}
