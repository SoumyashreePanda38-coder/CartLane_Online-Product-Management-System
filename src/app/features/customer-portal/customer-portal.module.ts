import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



import { CustomerPortalRoutingModule }
  from './customer-portal-routing.module';



import { DashboardComponent }
  from './dashboard/dashboard.component';



import { CartComponent }
  from './cart/cart.component';



import { CheckoutComponent }
  from './checkout/checkout.component';



import { NavbarComponent }
  from './navbar/navbar.component';



import { ProfileComponent }
  from './profile/profile.component';

import { MyOrdersComponent } from './orders/my-orders/my-orders.component';
import { OrderDetailsComponent } from './orders/order-details/order-details.component';
import { TrackOrderComponent } from './orders/track-order/track-order.component';








import { ProductListComponent }
  from './products/product-list/product-list.component';



import { CategoryProductsComponent }
  from './products/category-products/category-products.component';
import { CustomerLayoutComponent } from './customer-layout/customer-layout.component';



@NgModule({

  declarations: [


    DashboardComponent,


    CartComponent,


    CheckoutComponent,


    NavbarComponent,


    ProfileComponent,





    ProductListComponent,


    CategoryProductsComponent,
    CustomerLayoutComponent,
    MyOrdersComponent,

    OrderDetailsComponent,

    TrackOrderComponent


  ],


  imports: [

    CommonModule,

    CustomerPortalRoutingModule,
    FormsModule

  ]

})


export class CustomerPortalModule { }