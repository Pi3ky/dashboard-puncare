import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServicesPageComponent } from './services-page/services-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { ProductsPageComponent } from './products-page/products-page.component';
import { OrdersPageComponent } from './orders-page/orders-page.component';
import { ContactsPageComponent } from './contacts-page/contacts-page.component';
import { EditProductComponent } from './products-page/edit-product/edit-product.component';
import { EditServiceComponent } from './services-page/edit-service/edit-service.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardPageComponent },

  { path: 'services', component: ServicesPageComponent },
  { path: 'services/add', component: EditServiceComponent },
  { path: 'services/:id', component: EditServiceComponent },

  { path: 'products', component: ProductsPageComponent },
  { path: 'products/add', component: EditProductComponent },
  { path: 'products/:id', component: EditProductComponent },

  { path: 'orders', component: OrdersPageComponent },
  { path: 'contacts', component: ContactsPageComponent },

  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
