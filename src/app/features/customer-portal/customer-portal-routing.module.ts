import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { DashboardComponent }
  from './dashboard/dashboard.component';


import { CartComponent }
  from './cart/cart.component';


import { CheckoutComponent }
  from './checkout/checkout.component';


import { ProfileComponent }
  from './profile/profile.component';



import { ProductListComponent }
  from './products/product-list/product-list.component';



import { CategoryProductsComponent }
  from './products/category-products/category-products.component';



import { CustomerLayoutComponent }
  from './customer-layout/customer-layout.component';



import { MyOrdersComponent }
  from './orders/my-orders/my-orders.component';




import { TrackOrderComponent }
  from './orders/track-order/track-order.component';


import { OrderDetailsComponent }
  from './orders/order-details/order-details.component';



const routes: Routes = [


  {
    path: '',
    component: CustomerLayoutComponent,


    children: [


      {
        path: 'dashboard',
        component: DashboardComponent
      },


      {
        path: 'products',
        component: ProductListComponent
      },


      {
        path: 'categories',
        component: CategoryProductsComponent
      },


      {
        path: 'cart',
        component: CartComponent
      },


      {
        path: 'checkout',
        component: CheckoutComponent
      },


      {
        path: 'profile',
        component: ProfileComponent
      },



      // ORDERS SECTION
      {
        path: 'orders',
        component: MyOrdersComponent
      },

      {
        path: 'order-details/:id',
        component: OrderDetailsComponent
      },

      {
        path: 'track-order/:id',
        component: TrackOrderComponent
      },




      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }


    ]

  }


];



@NgModule({

  imports: [
    RouterModule.forChild(routes)
  ],

  exports: [
    RouterModule
  ]

})


export class CustomerPortalRoutingModule { }