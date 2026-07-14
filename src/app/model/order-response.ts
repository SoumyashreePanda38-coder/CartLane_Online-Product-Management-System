export class OrderResponse {

  orderId!: number;

  customerId!: number;

  customerName!: string;

  orderDate!: string;

  totalAmount!: number;

  deliveryAddress!: string;

  paymentMethod!: string;

  status!: string;

  createdAt!: string;

  updatedAt!: string;

  constructor(
    orderId?: number,
    customerId?: number,
    customerName?: string,
    orderDate?: string,
    totalAmount?: number,
    deliveryAddress?: string,
    paymentMethod?: string,
    status?: string,
    createdAt?: string,
    updatedAt?: string
  ) {

    this.orderId = orderId ?? 0;

    this.customerId = customerId ?? 0;

    this.customerName = customerName ?? '';

    this.orderDate = orderDate ?? '';

    this.totalAmount = totalAmount ?? 0;

    this.deliveryAddress = deliveryAddress ?? '';

    this.paymentMethod = paymentMethod ?? '';

    this.status = status ?? '';

    this.createdAt = createdAt ?? '';

    this.updatedAt = updatedAt ?? '';

  }

}