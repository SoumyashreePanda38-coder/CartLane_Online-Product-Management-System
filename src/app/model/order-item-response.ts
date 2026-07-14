export class OrderItemResponse {

  orderItemId!: number;

  orderId!: number;

  productId!: number;

  productName!: string;

  quantity!: number;

  unitPrice!: number;

  totalPrice!: number;

  createdAt!: string;

  updatedAt!: string;

  constructor(
    orderItemId?: number,
    orderId?: number,
    productId?: number,
    productName?: string,
    quantity?: number,
    unitPrice?: number,
    totalPrice?: number,
    createdAt?: string,
    updatedAt?: string
  ) {

    this.orderItemId = orderItemId ?? 0;
    this.orderId = orderId ?? 0;
    this.productId = productId ?? 0;
    this.productName = productName ?? '';
    this.quantity = quantity ?? 0;
    this.unitPrice = unitPrice ?? 0;
    this.totalPrice = totalPrice ?? 0;
    this.createdAt = createdAt ?? '';
    this.updatedAt = updatedAt ?? '';

  }

}