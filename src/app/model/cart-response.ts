import { CartItemResponse } from './cart-item-response';

export class CartResponse {

  cartId!: number;

  customerId!: number;

  totalAmount!: number;

  updatedAt!: string;

  items: CartItemResponse[] = [];

}