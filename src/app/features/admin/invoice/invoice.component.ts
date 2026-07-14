import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { InvoiceService } from 'src/app/core/services/invoice.service';

import { InvoiceResponse } from 'src/app/model/invoice-response';
import { InvoiceRequest } from 'src/app/model/invoice-request';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  invoice?: InvoiceResponse;

  orderId!: number;

  loading = false;

  constructor(
    private invoiceService: InvoiceService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {

      if (params['orderId']) {
        this.orderId = +params['orderId'];
        this.loadInvoice();
      }

    });

  }

  /**
   * Load Invoice
   */
  loadInvoice(): void {

    if (!this.orderId) {
      return;
    }

    this.loading = true;

    this.invoiceService.getInvoiceByOrderId(this.orderId)
      .subscribe({

        next: (response) => {

          this.invoice = response;
          this.loading = false;

        },

        error: () => {

          // Invoice doesn't exist, create one automatically
          this.createInvoice();

        }

      });

  }

  /**
   * Create Invoice
   */
  createInvoice(): void {

    const request: InvoiceRequest = {

      orderId: this.orderId

    };

    this.invoiceService.createInvoice(request)
      .subscribe({

        next: (response) => {

          this.invoice = response;
          this.loading = false;

        },

        error: (err) => {

          console.error(err);

          this.loading = false;

          alert('Unable to generate invoice.');

        }

      });

  }

  /**
   * Download PDF
   */
  downloadPdf(): void {

    window.print();

  }

  /**
   * Export Excel
   */
  exportExcel(): void {

    alert('Excel export feature will be implemented later.');

  }

  /**
   * Delete Invoice
   */
  deleteInvoice(invoiceId: number): void {

    if (!confirm('Are you sure you want to delete this invoice?')) {
      return;
    }

    this.invoiceService.deleteInvoice(invoiceId)
      .subscribe({

        next: () => {

          alert('Invoice deleted successfully.');

          this.invoice = undefined;

        },

        error: (err) => {

          console.error(err);

          alert('Unable to delete invoice.');

        }

      });

  }

}