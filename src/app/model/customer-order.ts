import { OrderResponse } from "./order-response";
import { OrderItemResponse } from "./order-item-response";

export interface CustomerOrder {

    order: OrderResponse;

    items: OrderItemResponse[];

}