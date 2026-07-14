import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CategoryService } from 'src/app/core/services/category.service';
import { CategoryRequestModel } from 'src/app/model/category-request.model';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {

  category: CategoryRequestModel = new CategoryRequestModel();

  categoryId!: number;

  isEdit = false;

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.categoryId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.categoryId) {

      this.isEdit = true;

      this.categoryService.getCategoryById(this.categoryId)
        .subscribe(data => {

          this.category.categoryName = data.categoryName;
          this.category.description = data.description;
          this.category.imageUrl = data.imageUrl;
          this.category.status = data.status;

        });

    }

  }

  

 saveCategory(): void {

  if (this.isEdit) {

    this.categoryService.updateCategory(this.categoryId, this.category)
      .subscribe({

        next: (response) => {

          alert("Category Updated Successfully");

          this.router.navigate(['/admin/categories']);

        },

        error: (err) => {

          console.error(err);

          alert("Unable to update category.");

        }

      });

  }

  else {

    this.categoryService.addCategory(this.category)
      .subscribe({

        next: (response) => {

          alert("Category Added Successfully");

          this.router.navigate(['/admin/categories']);

        },

        error: (err) => {

          console.error(err);

          alert("Unable to save category.");

        }

      });

  }

}

}