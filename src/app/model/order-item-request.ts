export class OrderItemRequest {

  orderId!: number;

  productId!: number;

  quantity!: number;

  unitPrice!: number;

  constructor(
    orderId?: number,
    productId?: number,
    quantity?: number,
    unitPrice?: number
  ) {

    this.orderId = orderId ?? 0;
    this.productId = productId ?? 0;
    this.quantity = quantity ?? 1;
    this.unitPrice = unitPrice ?? 0;

  }

}