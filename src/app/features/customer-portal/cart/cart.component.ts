import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CartService } from 'src/app/core/services/cart.service';

import { CartResponse } from 'src/app/model/cart-response';
import { CartItemResponse } from 'src/app/model/cart-item-response';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart!: CartResponse;

  cartItems: CartItemResponse[] = [];

  loading = false;

  customerId!: number;

  constructor(
    private cartService: CartService,
    private router: Router
  ) { }

 ngOnInit(): void {

  const id = localStorage.getItem('customerId');

  if (id !== null) {

    this.customerId = Number(id);

    console.log("Customer ID =", this.customerId);

    this.loadCart();

  } else {

    alert("Customer not logged in");

    this.router.navigate(['/login']);

  }

}
  // ==========================================
  // Load Cart
  // ==========================================

 loadCart(): void {

  this.loading = true;

  console.log("Customer ID =", this.customerId);

  this.cartService.getCart(this.customerId).subscribe({

    next: (response: CartResponse) => {

      console.log("Full Response");
      console.log(response);

      console.log("Items");
      console.log(response.items);

      console.log("Items Length =", response.items.length);

      this.cart = response;
      this.cartItems = response.items || [];

      console.log("cartItems =", this.cartItems);

      this.loading = false;

    },

    error: (err) => {

      console.log(err);

      this.loading = false;

    }

  });

}

      
    
  // ==========================================
  // Remove Item
  // ==========================================

  removeItem(cartItemId: number): void {

    if (!confirm('Remove this item from cart?')) {
      return;
    }

    this.cartService.removeCartItem(cartItemId).subscribe({

      next: () => {

        alert('Item removed successfully');

        this.loadCart();

      },

      error: (error) => {

        console.error(error);

        alert('Unable to remove item');

      }

    });

  }

  // ==========================================
  // Clear Cart
  // ==========================================

  clearCart(): void {

    if (!confirm('Are you sure you want to clear the cart?')) {
      return;
    }

    this.cartService.clearCart(this.customerId).subscribe({

      next: () => {

        alert('Cart cleared successfully');

        this.loadCart();

      },

      error: (error) => {

        console.error(error);

        alert('Unable to clear cart');

      }

    });

  }

  // ==========================================
  // Checkout
  // ==========================================

  checkout(): void {

    if (this.cartItems.length === 0) {

      alert('Your cart is empty.');

      return;

    }

   this.router.navigate(['/customer/checkout']);

  }

  // ==========================================
  // Continue Shopping
  // ==========================================

  continueShopping(): void {

   this.router.navigate(['/customer/products']);

  }
}