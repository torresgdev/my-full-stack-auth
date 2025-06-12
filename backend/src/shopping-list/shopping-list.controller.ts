import { Controller, Post, Get, Patch, Body, Param, UseGuards, Request, HttpCode, HttpStatus  } from '@nestjs/common';
import { ShoppingListService } from './shopping-list.service';
import { CreateShoppinListItemDto } from './dto/create-shopping-list-item.dto';
import { UpdateShoppingListItemDto } from './dto/update-shopping-list-item.dto';


@Controller('shopping-list')
export class ShoppingListController {
    constructor(private readonly shoppingListService: ShoppingListService){}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() createDto: CreateShoppinListItemDto, @Request() req) {
        return this.shoppingListService.create(createDto, req.user.id);
    }

    @Get()
    findAll(@Request() req) {
        return this.shoppingListService.findAll(req.user.id)
    }

    @Get(':id')
    findOne(@Param('id') id: string, @Request() req) {
        return this.shoppingListService.findOne(id, req.user.id)
    }

    @Get(':id')
    update(@Param('id') id: string,@Body() updateDto: UpdateShoppingListItemDto, @Request() req) {
        return this.shoppingListService.update(id, updateDto, req.user.id)
    }

    @Patch(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id') id: string, @Request() req) {
        return this.shoppingListService.remove(id, req.user.id)
    }
}
