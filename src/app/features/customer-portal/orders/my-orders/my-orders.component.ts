import { Component, OnInit } from '@angular/core';

import { OrderService } from 'src/app/core/services/order.service';
import { OrderItemService } from 'src/app/core/services/order-item.service';

import { OrderResponse } from 'src/app/model/order-response';
import { OrderItemResponse } from 'src/app/model/order-item-response';
import { CustomerOrder } from 'src/app/model/customer-order';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  customerId!: number;

  loading = false;

  // Each object contains one order and all its products
  customerOrders: CustomerOrder[] = [];

  constructor(
    private orderService: OrderService,
    private orderItemService: OrderItemService
  ) { }

  ngOnInit(): void {

    const id = localStorage.getItem('customerId');

    if (id) {

      this.customerId = Number(id);

      this.loadOrders();

    } else {

      alert('Customer not logged in');

    }

  }

  // ===================================
  // Load Orders
  // ===================================

  loadOrders(): void {

    this.loading = true;

    this.orderService.getOrdersByCustomer(this.customerId).subscribe({

      next: (orders: OrderResponse[]) => {

        if (orders.length === 0) {

          this.loading = false;

          return;

        }

        let completed = 0;

        orders.forEach(order => {

          this.orderItemService
            .getOrderItemsByOrder(order.orderId)
            .subscribe({

              next: (items: OrderItemResponse[]) => {

                this.customerOrders.push({

                  order: order,

                  items: items

                });

                completed++;

                if (completed === orders.length) {

                  this.loading = false;

                }

              },

              error: err => {

                console.error(err);

                completed++;

                if (completed === orders.length) {

                  this.loading = false;

                }

              }

            });

        });

      },

      error: err => {

        console.error(err);

        this.loading = false;

      }

    });

  }

}