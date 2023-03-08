import {Restaurant, RestaurantProduct} from '../restaurants/restaurants.types';

export interface Product extends RestaurantProduct {
  restaurant: Restaurant;
}
