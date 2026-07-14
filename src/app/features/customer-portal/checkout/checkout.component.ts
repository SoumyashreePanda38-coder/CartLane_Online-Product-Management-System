import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CartService } from 'src/app/core/services/cart.service';
import { OrderService } from 'src/app/core/services/order.service';
import { OrderItemService } from 'src/app/core/services/order-item.service';

import { CartResponse } from 'src/app/model/cart-response';
import { CartItemResponse } from 'src/app/model/cart-item-response';

import { OrderRequest } from 'src/app/model/order-request';
import { OrderResponse } from 'src/app/model/order-response';

import { OrderItemRequest } from 'src/app/model/order-item-request';
import { CustomerService } from 'src/app/core/services/customer.service';
import { CustomerResponse } from 'src/app/model/customer-response';
import { CustomerRequest } from 'src/app/model/customer-request';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  cart!: CartResponse;

  cartItems: CartItemResponse[] = [];

  customerId!: number;
  // Customer Details
  customer!: CustomerResponse;

  loading = false;

  // Shipping Details

  fullName = '';

  phone = '';

  email = '';

  address = '';

  city = '';

  state = '';

  pincode = '';

  paymentMethod = 'COD';

  constructor(
    private cartService: CartService,
    private customerService: CustomerService,
    private orderService: OrderService,
    private orderItemService: OrderItemService,
    private router: Router
  ) { }

  ngOnInit(): void {
    console.log("customerId =", localStorage.getItem("customerId"));
    console.log(localStorage);

    const id = localStorage.getItem('customerId');

    if (id) {

      this.customerId = Number(id);

      this.loadCustomer();

      this.loadCart();

    }
    else {

      alert('Please login first');

      this.router.navigate(['/login']);

    }

  }

  loadCustomer(): void {

    this.customerService.getCustomerById(this.customerId).subscribe({

      next: (customer: CustomerResponse) => {

        console.log(customer);

        this.customer = customer;

        this.fullName = customer.fullName;
        this.email = customer.email;
        this.phone = customer.phoneNumber;

        if (customer.address) {
          this.address = customer.address;
        }

      },

      error: (err) => {

        console.error(err);

      }

    });

  }

  loadCart(): void {

    this.loading = true;

    this.cartService.getCart(this.customerId).subscribe({

      next: (response: CartResponse) => {

        this.cart = response;

        this.cartItems = response.items || [];

        this.loading = false;

      },

      error: (err) => {

        console.log(err);

        this.loading = false;

      }

    });

  }
  

  placeOrder(): void {

    if (

      this.address.trim() == '' ||

      this.city.trim() == '' ||

      this.state.trim() == '' ||

      this.pincode.trim() == ''

    ) {

      alert("Please fill all shipping details.");

      return;

    }
    // ======================================
// Update Customer Address
// ======================================

const customerRequest: CustomerRequest = {

  address:
      this.address +
      ", " +
      this.city +
      ", " +
      this.state +
      " - " +
      this.pincode,

  city: this.city,

  state: this.state,

  pincode: this.pincode,

  status: this.customer.status

};// ======================================
// First update customer address
// ======================================

this.customerService.updateCustomer(
  this.customerId,
  customerRequest
).subscribe({

  next: () => {

    const request: OrderRequest = {

      customerId: this.customerId,

      totalAmount: this.cart.totalAmount,

      deliveryAddress: customerRequest.address,

      paymentMethod: this.paymentMethod,

      status: "PENDING"

    };

    this.orderService.createOrder(request).subscribe({

      next: (order: OrderResponse) => {

        this.createOrderItems(order.orderId);

      },

      error: (err) => {

        console.log(err);

        alert("Unable to place order.");

      }

    });

  },

  error: (err) => {

    console.log(err);

    alert("Unable to save customer address.");

  }

});
}
  createOrderItems(orderId: number): void {

    let completed = 0;

    this.cartItems.forEach(item => {

      const request = new OrderItemRequest();

      request.orderId = orderId;
      request.productId = item.productId;
      request.quantity = item.quantity;
      request.unitPrice = item.price;

      this.orderItemService.createOrderItem(request).subscribe({

        next: () => {

          completed++;

          if (completed === this.cartItems.length) {

            this.clearCart();

          }

        },

        error: err => console.log(err)

      });

    });

  }

  clearCart() {

    this.cartService.clearCart(this.customerId).subscribe({

      next: () => {

        alert("Order Placed Successfully");

        this.router.navigate(['/customer/orders']);

      },

      error: err => console.log(err)

    });

  }

}