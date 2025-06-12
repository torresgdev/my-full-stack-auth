import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { ShoppingListItem } from "src/shopping-list/shopping-list-item.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({unique: true})
    email: string;

    @Column()
    password: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => ShoppingListItem, shoppingListItem => shoppingListItem.user)
    shoppingListItems: ShoppingListItem[];

}
