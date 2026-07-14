import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { OrderService } from 'src/app/core/services/order.service';
import { OrderItemService } from 'src/app/core/services/order-item.service';

import { OrderResponse } from 'src/app/model/order-response';
import { OrderItemResponse } from 'src/app/model/order-item-response';

@Component({
  selector: 'app-customer-orders',
  templateUrl: './customer-orders.component.html',
  styleUrls: ['./customer-orders.component.css']
})
export class CustomerOrdersComponent implements OnInit {

  customerId!: number;

  loading: boolean = false;

  orders: OrderResponse[] = [];

  orderItems: { [key: number]: OrderItemResponse[] } = {};

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private orderItemService: OrderItemService
  ) { }

  ngOnInit(): void {

     console.log(this.route.snapshot.paramMap);


  console.log(
    "customerId from route = ",
    this.route.snapshot.paramMap.get('customerId')
  );

    this.customerId = Number(
      this.route.snapshot.paramMap.get('customerId')
    );

    this.loadOrders();

  }

  // ==========================================
  // Load Orders
  // ==========================================

  loadOrders(): void {

    this.loading = true;

    this.orderService.getOrdersByCustomer(this.customerId)
      .subscribe({

        next: (response: OrderResponse[]) => {

          this.orders = response;

          this.loading = false;

          this.orders.forEach(order => {

            this.loadOrderItems(order.orderId);

          });

        },

        error: (err) => {

          console.log(err);

          this.loading = false;

        }

      });

  }

  // ==========================================
  // Load Order Items
  // ==========================================

  loadOrderItems(orderId: number): void {

    this.orderItemService.getOrderItemsByOrder(orderId)
      .subscribe({

        next: (items: OrderItemResponse[]) => {

          this.orderItems[orderId] = items;

        },

        error: (err) => {

          console.log(err);

        }

      });

  }

}