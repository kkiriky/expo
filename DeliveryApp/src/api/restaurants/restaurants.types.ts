import {PaginationParams} from '../api.types';
import {User} from '../user/user.types';

export interface Restaurant {
  id: string;
  name: string;
  thumbUrl: string;
  tags: string[];
  priceRange: string;
  ratings: number;
  ratingsCount: number;
  deliveryTime: number;
  deliveryFee: number;
}

export interface RestaurantDetail extends Restaurant {
  detail: string;
  products: RestaurantProduct[];
}

export interface RestaurantProduct {
  id: string;
  name: string;
  imgUrl: string;
  detail: string;
  price: number;
}

export interface Review {
  id: string;
  user: User;
  rating: number;
  content: string;
  imgUrls: string[];
}

export interface GetReviewsParams extends PaginationParams {
  rid: string;
}
