import {Restaurant, RestaurantProduct} from '../restaurants/restaurants.types';
import {PatchBasketPayloadItem} from '../user/user.types';

export interface Order {
  id: string;
  products: OrderProdcut[];
  restaurant: Restaurant;
  totalPrice: number;
  createdAt: Date;
}

interface OrderProdcut {
  count: number;
  product: RestaurantProduct;
}

export interface CreateOrder {
  id: string;
  products: CreateOrderProduct[];
  totalPrice: number;
  createdAt: Date;
}

interface CreateOrderProduct extends PatchBasketPayloadItem {}
