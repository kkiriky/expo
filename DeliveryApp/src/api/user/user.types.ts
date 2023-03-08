import {Product} from '../products/products.types';

export interface User {
  id: string;
  username: string;
  imageUrl: string;
}

export interface BasketItem {
  count: number;
  product: Product;
}

export interface PatchBasketPayload {
  basket: PatchBasketPayloadItem[];
}

export interface PatchBasketPayloadItem {
  productId: string;
  count: number;
}
