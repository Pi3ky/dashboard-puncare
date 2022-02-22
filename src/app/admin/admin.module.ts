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
import { EditServiceComponent } from './services-page/edit-service/edit-service.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { ModalViewOrderComponent } from './orders-page/modal-view-order/modal-view-order.component';
import { Daterangepicker } from 'ng2-daterangepicker';

@NgModule({
  declarations: [
    ServicesPageComponent,
    ProductsPageComponent,
    ContactsPageComponent,
    OrdersPageComponent,
    DashboardPageComponent,
    EditProductComponent,
    EditServiceComponent,
    ModalViewOrderComponent,
  ],
  imports: [
    CommonModule,
    ShareModule,
    EditorModule,
    Daterangepicker,
    ModalModule.forRoot(),
    NgSelectModule,
    AdminRoutingModule,
  ],
  entryComponents: [ModalViewOrderComponent]
})
export class AdminModule {}
