import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProductRequest } from 'src/app/model/product-request';
import { ProductService } from 'src/app/core/services/product.service';

import { CategoryService } from 'src/app/core/services/category.service';
import { CategoryResponseModel } from 'src/app/model/category-response.model';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  product: ProductRequest = new ProductRequest();

  categories: CategoryResponseModel[] = [];

  isEditMode = false;

  productId!: number;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.loadCategories();

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {

      this.productId = Number(id);

      this.isEditMode = true;

      this.loadProduct();

    }

  }

  /**
   * Load all categories
   */
  loadCategories(): void {

    this.categoryService.getAllCategories().subscribe({

      next: (response: any) => {

        // If backend returns Page<CategoryResponse>
        if (response.content) {
          this.categories = response.content;
        }

        // If backend returns List<CategoryResponse>
        else {
          this.categories = response;
        }

        console.log("Categories Loaded:", this.categories);

      },

      error: (err) => {

        console.error("Category Load Error:", err);

      }

    });

  }

  /**
   * Load Product for Edit
   */
  loadProduct(): void {

    this.productService.getProductById(this.productId).subscribe({

      next: (data) => {

        this.product = data;

      },

      error: (err) => {

        console.error(err);

      }

    });

  }

  /**
   * Save or Update Product
   */
  saveProduct(): void {

    if (this.isEditMode) {

      this.productService.updateProduct(this.productId, this.product)

        .subscribe({

          next: () => {

            alert("Product Updated Successfully");

            this.router.navigate(['/admin/products']);

          },

          error: (err) => {

            console.error(err);

          }

        });

    } else {

      this.productService.addProduct(this.product)

        .subscribe({

          next: () => {

            alert("Product Added Successfully");

            this.router.navigate(['/admin/products']);

          },

          error: (err) => {

            console.error(err);

          }

        });

    }

  }

}