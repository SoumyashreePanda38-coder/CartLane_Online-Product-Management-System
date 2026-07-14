import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { OrderService } from 'src/app/core/services/order.service';
import { OrderResponse } from 'src/app/model/order-response';

@Component({
  selector: 'app-track-order',
  templateUrl: './track-order.component.html',
  styleUrls: ['./track-order.component.css']
})
export class TrackOrderComponent implements OnInit {

  orderId!: number;

  order!: OrderResponse;

  loading = false;

  estimatedDelivery!: Date;

  constructor(

    private route: ActivatedRoute,

    private orderService: OrderService

  ) { }

  ngOnInit(): void {

    this.orderId = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.loadOrder();

  }

  // ======================================
  // Load Order
  // ======================================

  loadOrder(): void {

    this.loading = true;

    this.orderService.getOrderById(this.orderId).subscribe({

      next: (response: OrderResponse) => {

        this.order = response;

        // Estimated Delivery = Order Date + 5 Days
        const orderDate = new Date(response.orderDate);

        orderDate.setDate(orderDate.getDate() + 5);

        this.estimatedDelivery = orderDate;

        this.loading = false;

      },

      error: (err) => {

        console.error(err);

        this.loading = false;

      }

    });

  }

}