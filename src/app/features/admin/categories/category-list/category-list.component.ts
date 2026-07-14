import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/core/services/category.service';
import { CategoryResponseModel } from 'src/app/model/category-response.model';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories: CategoryResponseModel[] = [];

  searchKeyword: string = '';

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.getAllCategories();

  }

  getAllCategories() {

    this.categoryService.getAllCategories().subscribe({

      next: (response) => {

        this.categories = response;

      },

      error: (error) => {

        console.log(error);

      }

    });

  }

  searchCategory() {

    if (this.searchKeyword.trim() === '') {

      this.getAllCategories();

      return;

    }

    this.categoryService.searchCategory(this.searchKeyword).subscribe({

      next: (response) => {

        this.categories = response;

      }

    });

  }

  addCategory() {

    this.router.navigate(['/admin/categories/add']);

  }

  editCategory(id: number) {

    this.router.navigate(['/admin/categories/edit', id]);

  }

  deleteCategory(id: number) {

    if (confirm("Are you sure you want to delete this category?")) {

      this.categoryService.deleteCategory(id).subscribe({

        next: () => {

          alert("Category Deleted Successfully");

          this.getAllCategories();

        }

      });

    }

  }

}