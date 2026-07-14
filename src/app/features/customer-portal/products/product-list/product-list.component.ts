import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/core/services/product.service';
import { CartService } from 'src/app/core/services/cart.service';
import { ProductResponse } from 'src/app/model/product-response';
import { SearchService } from 'src/app/core/services/search.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: ProductResponse[] = [];

  filteredProducts: ProductResponse[] = [];

  loading = false;

  searchText = '';

  customerId!: number;      // Replace with logged in customer later

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private searchService: SearchService
  ) { }

  ngOnInit(): void {

    const id = localStorage.getItem('customerId');

    if (id) {
      this.customerId = Number(id);
      console.log("Customer ID =", this.customerId);
    } else {
      alert("Customer not logged in");
      return;
    }

    this.loadProducts();
  }
  addToCart(product: ProductResponse): void {

    console.log({
      customerId: this.customerId,
      productId: product.id,
      quantity: 1
    });

    const request = {
      customerId: this.customerId,
      productId: product.id,
      quantity: 1
    };

    this.cartService.addToCart(request).subscribe({

      next: (response) => {

        console.log("Cart Response =", response);

        alert(product.productName + " added to cart.");

      },

      error: (err) => {

        console.error(err);

        alert("Unable to add product.");

      }

    });

  }

  get search(): string {

    return this.searchText;

  }

  set search(value: string) {

    this.searchText = value;

    this.filterProducts();

  }

  filterProducts(): void {

    const text = this.searchText.toLowerCase();

    this.filteredProducts = this.products.filter(product =>

      product.productName.toLowerCase().includes(text) ||

      product.categoryName.toLowerCase().includes(text)

    );

  }

  loadProducts(): void {

    this.loading = true;

    this.productService.getAllProducts().subscribe({

      next: (response: ProductResponse[]) => {

        this.products = response;

        this.filteredProducts = response;

        // Start listening to navbar search
        this.listenSearch();

        this.loading = false;

      },

      error: (err) => {

        console.error(err);

        this.loading = false;

      }

    });

  }
  listenSearch(): void {

  this.searchService.searchText$
    .subscribe({

      next: (text) => {

        this.searchText = text;

        this.filterProducts();

      }

    });

}
}