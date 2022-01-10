import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';

import { ModalModule } from 'ngx-bootstrap/modal';
import { NgSelectModule } from '@ng-select/ng-select';

import { ServicesPageComponent } from './services-page/services-page.component';
import { ProductsPageComponent } from './products-page/products-page.component';
import { ContactsPageComponent } from './contacts-page/contacts-page.component';
import { OrdersPageComponent } from './orders-page/orders-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { ShareModule } from '../_components/share.module';
import { EditProductComponent } from './products-page/edit-product/edit-product.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { EditServiceComponent } from './services-page/edit-service/edit-service.component';

@NgModule({
  declarations: [ServicesPageComponent, ProductsPageComponent, ContactsPageComponent, OrdersPageComponent, DashboardPageComponent, EditProductComponent, EditServiceComponent],
  imports: [
    CommonModule,
    ShareModule,
    EditorModule,
    ModalModule.forRoot(),
    NgSelectModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
