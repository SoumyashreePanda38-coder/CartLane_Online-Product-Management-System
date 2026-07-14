import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProductRoutingModule } from './products-routing.module';

import { ProductListComponent } from './product-list/product-list.component';
import { ProductFormComponent } from './product-form/product-form.component';

@NgModule({

  declarations: [

    ProductListComponent,

    ProductFormComponent

  ],

  imports: [

    CommonModule,

    FormsModule,

    ProductRoutingModule

  ]

})

export class ProductModule { }