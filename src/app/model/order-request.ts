export class OrderRequest {

  customerId!: number;

  totalAmount!: number;

  deliveryAddress!: string;

  paymentMethod!: string;

  status!: string;

  constructor(
    customerId?: number,
    totalAmount?: number,
    deliveryAddress?: string,
    paymentMethod?: string,
    status?: string
  ) {

    this.customerId = customerId ?? 0;

    this.totalAmount = totalAmount ?? 0;

    this.deliveryAddress = deliveryAddress ?? '';

    this.paymentMethod = paymentMethod ?? 'COD';

    this.status = status ?? 'PENDING';

  }

}