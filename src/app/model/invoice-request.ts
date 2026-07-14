export class InvoiceRequest {

  orderId!: number;

  constructor(
    orderId?: number
  ) {
    if (orderId !== undefined) {
      this.orderId = orderId;
    }
  }

}