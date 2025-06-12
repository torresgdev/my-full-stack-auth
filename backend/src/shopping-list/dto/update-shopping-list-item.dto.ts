import { PartialType } from "@nestjs/mapped-types";
import { CreateShoppinListItemDto } from "./create-shopping-list-item.dto";
import { IsBoolean, IsOptional } from "class-validator";

export class UpdateShoppingListItemDto extends PartialType(CreateShoppinListItemDto){
    @IsOptional()
    @IsBoolean({message:'isPurchased deve ser um valor booleano'})
    isPurchased?:  boolean;
}