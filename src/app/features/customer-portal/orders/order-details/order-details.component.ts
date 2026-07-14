import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { OrderService } from 'src/app/core/services/order.service';
import { OrderItemService } from 'src/app/core/services/order-item.service';

import { OrderResponse } from 'src/app/model/order-response';
import { OrderItemResponse } from 'src/app/model/order-item-response';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  orderId!: number;

  order!: OrderResponse;

  orderItems: OrderItemResponse[] = [];

  loading = false;

  constructor(

    private route: ActivatedRoute,

    private orderService: OrderService,

    private orderItemService: OrderItemService

  ) { }

  ngOnInit(): void {

    this.orderId = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.loadOrder();

    this.loadOrderItems();

  }

  // ======================================
  // Load Order
  // ======================================

  loadOrder(): void {

    this.loading = true;

    this.orderService.getOrderById(this.orderId).subscribe({

      next: (response: OrderResponse) => {

        this.order = response;

        this.loading = false;

      },

      error: (err) => {

        console.error(err);

        this.loading = false;

      }

    });

  }

  // ======================================
  // Load Order Items
  // ======================================

  loadOrderItems(): void {

    this.orderItemService
      .getOrderItemsByOrder(this.orderId)
      .subscribe({

        next: (response: OrderItemResponse[]) => {

          this.orderItems = response;

        },

        error: (err) => {

          console.error(err);

        }

      });

  }

}