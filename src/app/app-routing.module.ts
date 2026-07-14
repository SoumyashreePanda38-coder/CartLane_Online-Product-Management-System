import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthComponent } from './features/auth/auth/auth.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';

const routes: Routes = [

  // ==========================
  // Authentication
  // ==========================

  {
    path: '',
    component: AuthComponent
  },

  {
    path: 'login',
    component: AuthComponent
  },

  {
    path: 'register',
    component: RegisterComponent
  },

  // ==========================
  // ADMIN MODULE (Lazy Loaded)
  // ==========================

  {
    path: 'admin',
    loadChildren: () =>
      import('./features/admin/admin.module')
      .then(m => m.AdminModule)
  },

  // ==========================
  // CUSTOMER PORTAL
  // ==========================

  {
    path: 'customer',
    loadChildren: () =>
      import('./features/customer-portal/customer-portal.module')
      .then(m => m.CustomerPortalModule)
  },

  // ==========================
  // Wildcard
  // ==========================

  {
    path: '**',
    redirectTo: ''
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }