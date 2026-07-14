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

  selectedStatus = '';

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private orderItemService: OrderItemService
  ) { }

  ngOnInit(): void {

    this.orderId = Number(
      this.route.snapshot.paramMap.get('orderId')
    );

    this.loadOrder();

    this.loadOrderItems();

  }

  loadOrder(): void {

    this.loading = true;

    this.orderService
      .getOrderById(this.orderId)
      .subscribe({

        next: (data) => {

          this.order = data;
          this.selectedStatus = data.status;

          this.loading = false;

        },

        error: (err) => {

          console.log(err);

          this.loading = false;

        }

      });

  }

  updateStatus(): void {

  this.orderService
      .updateOrderStatus(
          this.orderId,
          this.selectedStatus
      )
      .subscribe({

          next: (response) => {

              this.order = response;

              alert("Order Status Updated Successfully.");

          },

          error: (err) => {

              console.log(err);

          }

      });

}

  loadOrderItems(): void {

    this.orderItemService
      .getOrderItemsByOrder(this.orderId)
      .subscribe({

        next: (data) => {

          this.orderItems = data;

        },

        error: (err) => {

          console.log(err);

        }

      });

  }

}