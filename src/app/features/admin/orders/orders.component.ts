import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { OrderService } from 'src/app/core/services/order.service';
import { OrderResponse } from 'src/app/model/order-response';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: OrderResponse[] = [];

  filteredOrders: OrderResponse[] = [];

  loading: boolean = false;

  searchKeyword: string = '';

  constructor(
    private orderService: OrderService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {

    this.loading = true;

    this.orderService.getAllOrders().subscribe({

      next: (response: OrderResponse[]) => {

        this.orders = response;

        this.filteredOrders = response;

        this.loading = false;

      },

      error: (err) => {

        console.log(err);

        this.loading = false;

      }

    });

  }

  searchOrders(): void {

    if (this.searchKeyword.trim() === '') {

      this.filteredOrders = this.orders;

      return;

    }

    const keyword = this.searchKeyword.toLowerCase();

    this.filteredOrders = this.orders.filter(order =>

      order.customerName.toLowerCase().includes(keyword)

      ||

      order.orderId.toString().includes(keyword)

    );

  }

  viewOrder(orderId: number): void {

    console.log('View Order:', orderId);

    // Later we'll navigate to Order Details page
    // this.router.navigate(['/admin/orders', orderId]);
  

  this.router.navigate([
    '/admin/orders/view',
    orderId
  ]);

}

}

