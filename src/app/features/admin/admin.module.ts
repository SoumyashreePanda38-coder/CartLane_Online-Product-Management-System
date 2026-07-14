import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';

// Dashboard
import { DashboardComponent } from './dashboard/dashboard.component';

// Categories
import { CategoryListComponent } from './categories/category-list/category-list.component';
import { CategoryFormComponent } from './categories/category-form/category-form.component';

// Products
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductFormComponent } from './products/product-form/product-form.component';

// Customers
import { CustomerListComponent } from './customers/customer-list/customer-list.component';
import { CustomerDetailsComponent } from './customers/customer-details/customer-details.component';
import { CustomerOrdersComponent } from './customers/customer-orders/customer-orders.component';
import { CustomerIssuesComponent } from './customers/customer-issues/customer-issues.component';
import { IssueReplyComponent } from './customers/issue-reply/issue-reply.component';
//navbar and sidebar
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
//Orders
import { OrdersComponent } from './orders/orders.component';
// Settings

import { OrderDetailsComponent } from './orders/order-details/order-details.component';
import { StockListComponent } from './stock/stock-list/stock-list.component';
import { StockFormComponent } from './stock/stock-form/stock-form.component';
import { StockHistoryComponent } from './stock/stock-history/stock-history.component';
import { InvoiceComponent } from './invoice/invoice.component';;

@NgModule({

  declarations: [

    DashboardComponent,
    SidebarComponent,
    NavbarComponent,

    CategoryListComponent,
    CategoryFormComponent,

    ProductListComponent,
    ProductFormComponent,

    OrdersComponent,
    OrderDetailsComponent,

    CustomerListComponent,
    CustomerDetailsComponent,
    CustomerOrdersComponent,
    CustomerIssuesComponent,
    IssueReplyComponent,
    StockListComponent,
    StockFormComponent,
    StockHistoryComponent,
    InvoiceComponent
    
    

   

  ],

  imports: [

    CommonModule,
    FormsModule,
    AdminRoutingModule

  ]

})

export class AdminModule { }