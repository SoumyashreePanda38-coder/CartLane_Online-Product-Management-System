import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProductService } from 'src/app/core/services/product.service';
import { ProductResponse } from 'src/app/model/product-response';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  // ===============================
  // Variables
  // ===============================

  products: ProductResponse[] = [];

  searchKeyword: string = '';

  currentPage: number = 0;

  pageSize: number = 5;

  totalPages: number = 0;

  totalElements: number = 0;

  // ===============================
  // Constructor
  // ===============================

  constructor(

    private productService: ProductService,

    private router: Router

  ) { }

  // ===============================
  // OnInit
  // ===============================

  ngOnInit(): void {

    this.loadProducts();

  }

  // ===============================
  // Load All Products
  // ===============================

  loadProducts(): void {

    this.productService.getAllProducts().subscribe({

      next: (response) => {

        this.products = response;

      },

      error: (error) => {

        console.error(error);

        alert("Unable to load products.");

      }

    });

  }

  // ===============================
  // Search Products
  // ===============================

  searchProducts(): void {

    if (this.searchKeyword.trim() === '') {

      this.loadProducts();

      return;

    }

    this.productService.searchProducts(this.searchKeyword).subscribe({

      next: (response) => {

        this.products = response;

      },

      error: (error) => {

        console.error(error);

      }

    });

  }

  // ===============================
  // Add Product
  // ===============================

  addProduct(): void {

    this.router.navigate(['/admin/products/add']);

  }

  // ===============================
  // Edit Product
  // ===============================

  editProduct(id: number): void {

    this.router.navigate(['/admin/products/edit', id]);

  }

  // ===============================
  // Delete Product
  // ===============================

  deleteProduct(id: number): void {

    const confirmDelete = confirm("Are you sure you want to delete this product?");

    if (!confirmDelete) {

      return;

    }

    this.productService.deleteProduct(id).subscribe({

      next: () => {

        alert("Product deleted successfully.");

        this.loadProducts();

      },

      error: (error) => {

        console.error(error);

        alert("Unable to delete product.");

      }

    });

  }

  // ===============================
  // Previous Page
  // ===============================

  previousPage(): void {

    if (this.currentPage > 0) {

      this.currentPage--;

      this.loadPaginatedProducts();

    }

  }

  // ===============================
  // Next Page
  // ===============================

  nextPage(): void {

    if (this.currentPage < this.totalPages - 1) {

      this.currentPage++;

      this.loadPaginatedProducts();

    }

  }

  // ===============================
  // Pagination
  // ===============================

  loadPaginatedProducts(): void {

    this.productService.getProductsByPage(this.currentPage, this.pageSize)

      .subscribe({

        next: (response) => {

          this.products = response.content;

          this.totalPages = response.totalPages;

          this.totalElements = response.totalElements;

        },

        error: (error) => {

          console.error(error);

        }

      });

  }

}