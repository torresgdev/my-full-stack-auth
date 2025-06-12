export interface ShoppingListItem {
  id: string;
  name: string;
  quantity: number;
  isPurchased: boolean;
  userId: string;
  createdAt: string; 
  updatedAt: string; 
}

export interface User {
  id: string;
  email: string;
}

export interface JwtPayload {
  id: string;
  email: string;
  iat: number; 
  exp: number; 
}