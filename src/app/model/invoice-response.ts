export class InvoiceResponse {

  invoiceId!: number;

  invoiceNumber!: string;

  orderId!: number;

  amount!: number;

  issuedAt!: string;

  createdAt!: string;

  updatedAt!: string;

  constructor(
    invoiceId?: number,
    invoiceNumber?: string,
    orderId?: number,
    amount?: number,
    issuedAt?: string,
    createdAt?: string,
    updatedAt?: string
  ) {

    this.invoiceId = invoiceId ?? 0;
    this.invoiceNumber = invoiceNumber ?? '';
    this.orderId = orderId ?? 0;
    this.amount = amount ?? 0;
    this.issuedAt = issuedAt ?? '';
    this.createdAt = createdAt ?? '';
    this.updatedAt = updatedAt ?? '';

  }

}