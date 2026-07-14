import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CustomerService } from 'src/app/core/services/customer.service';
import { CustomerResponse } from 'src/app/model/customer-response';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  customers: CustomerResponse[] = [];

  searchKeyword: string = '';

  loading: boolean = false;

  constructor(
    private customerService: CustomerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadCustomers();
  }

  /**
   * Load All Customers
   */
  loadCustomers(): void {

    this.loading = true;

    this.customerService.getAllCustomers().subscribe({

      next: (data) => {
        this.customers = data;
        this.loading = false;
      },

      error: (error) => {
        console.error(error);
        this.loading = false;
      }

    });

  }

  /**
   * Search Customer
   */
  searchCustomer(): void {

    if (this.searchKeyword.trim() === '') {
      this.loadCustomers();
      return;
    }

    this.customerService.searchCustomers(this.searchKeyword).subscribe({

      next: (data) => {
        this.customers = data;
      },

      error: (error) => {
        console.error(error);
      }

    });

  }

  /**
   * View Customer Details
   */
 viewCustomer(customerId: number): void {

  this.router.navigate([
    '/admin/customers/view',
    customerId
  ]);

}


  /**
   * Delete Customer
   */
  deleteCustomer(customerId: number): void {

    if (confirm('Are you sure you want to delete this customer?')) {

      this.customerService.deleteCustomer(customerId).subscribe({

        next: () => {

          alert('Customer deleted successfully.');

          this.loadCustomers();

        },

        error: (error) => {

          console.error(error);

        }

      });

    }

  }

}