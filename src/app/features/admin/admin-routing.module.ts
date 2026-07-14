import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
// Stock Components
import { StockListComponent } from './stock/stock-list/stock-list.component';
import { StockFormComponent } from './stock/stock-form/stock-form.component';
import { StockHistoryComponent } from './stock/stock-history/stock-history.component';


// Settings
//Orders
import { OrdersComponent } from './orders/orders.component';
import { OrderDetailsComponent } from './orders/order-details/order-details.component';
import { InvoiceComponent } from './invoice/invoice.component';
const routes: Routes = [

  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },

  // Dashboard
  {
    path: 'dashboard',
    component: DashboardComponent
  },

  // Categories
  {
    path: 'categories',
    component: CategoryListComponent
  },
  {
    path: 'categories/add',
    component: CategoryFormComponent
  },
  {
    path: 'categories/edit/:categoryId',
    component: CategoryFormComponent
  },

  // Products
  {
    path: 'products',
    component: ProductListComponent
  },
  {
    path: 'products/add',
    component: ProductFormComponent
  },
  {
    path: 'products/edit/:productId',
    component: ProductFormComponent
  },

  // Customers
  {
    path: 'customers',
    component: CustomerListComponent
  },
  {
    path: 'customers/view/:customerId',
    component: CustomerDetailsComponent
  },
  {
    path: 'customers/view/:customerId/orders',
    component: CustomerOrdersComponent
  },
  {
    path: 'customers/view/:customerId/issues',
    component: CustomerIssuesComponent
  },
  {
    path: 'customers/issue/:issueId/reply',
    component: IssueReplyComponent
  },
   // Orders
  {
    path: 'orders',
    component: OrdersComponent
  },
  //order details
  {
  path: 'orders/view/:orderId',
  component: OrderDetailsComponent
},
// =========================
  // STOCK MANAGEMENT
  // =========================

  {
    path: 'stocks',
    component: StockListComponent
  },

 {
  path: 'stocks/add',
  component: StockFormComponent
},

{
  path: 'stocks/edit/:stockId',
  component: StockFormComponent
},

  {
    path: 'stocks/history/:id',
    component: StockHistoryComponent
  },

  // Settings
  //invoice
  // Invoice

{
  path: 'invoice',
  component: InvoiceComponent
}
  

];

@NgModule({

  imports: [RouterModule.forChild(routes)],

  exports: [RouterModule]

})

export class AdminRoutingModule { }