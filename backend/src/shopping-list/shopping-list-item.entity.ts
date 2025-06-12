import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { User } from "src/users/user.entity";

@Entity('shopping_list_items')
export class ShoppingListItem {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({default : 1})
    quantity: number

    @Column({default: false})
    isPurchased: boolean;

    @ManyToOne(() => User, user => user.shoppingListItems, { onDelete: 'CASCADE'})
    user: User

    @Column()
    userId: string;

    @CreateDateColumn({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP '})
    createdAt: Date;

    @UpdateDateColumn({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP '})
    updateAt: Date;
}


