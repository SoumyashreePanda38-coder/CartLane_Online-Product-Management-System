import { Component, OnInit } from '@angular/core';

import { CategoryService } 
from 'src/app/core/services/category.service';

import { CategoryResponseModel } 
from 'src/app/model/category-response.model';
import { Router } from '@angular/router';



@Component({
  selector: 'app-category-products',
  templateUrl: './category-products.component.html',
  styleUrls: ['./category-products.component.css']
})
export class CategoryProductsComponent implements OnInit {


  categories: CategoryResponseModel[] = [];

  loading: boolean = true;



  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) { }



  ngOnInit(): void {

    this.loadCategories();

  }
  viewProducts(categoryId:number){


    this.router.navigate(
        ['/customer/products'],
        {
            queryParams:{
                categoryId: categoryId
            }
        }
    );


}





  loadCategories(): void {


    this.categoryService
    .getAllCategories()
    .subscribe({

      next:(response)=>{


        this.categories = response;


        this.loading = false;


        console.log(
          "Customer Categories:",
          this.categories
        );


      },


      error:(error)=>{


        console.error(
          "Error loading categories:",
          error
        );


        this.loading = false;


      }


    });


  }



}