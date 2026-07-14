import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CustomerService } from 'src/app/core/services/customer.service';
import { CustomerResponse } from 'src/app/model/customer-response';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {

  customerId!: number;

  customer!: CustomerResponse;

  loading: boolean = false;

  constructor(
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.customerId = Number(
    this.route.snapshot.paramMap.get('customerId')
);
    if (this.customerId) {
      this.loadCustomer();
    }

  }

  /**
   * Load Customer Details
   */
  loadCustomer(): void {

    this.loading = true;

    this.customerService.getCustomerById(this.customerId).subscribe({

      next: (data) => {

        this.customer = data;

        this.loading = false;

      },

      error: (error) => {

        console.error(error);

        this.loading = false;

      }

    });

  }

  /**
   * Back to Customer List
   */
  goBack(): void {

    this.router.navigate(['/admin/customers']);

  }

  /**
   * View Customer Orders
   */
 viewOrders(): void {

  this.router.navigate([
    '/admin/customers/view',
    this.customerId,
    'orders'
  ]);

}

  /**
   * View Customer Issues
   */
  viewIssues(): void {

    this.router.navigate([
      '/admin/customers/view',
      this.customerId,
      'issues'
    ]);

  }

}