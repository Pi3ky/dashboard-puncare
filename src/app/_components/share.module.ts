import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { PaginationComponent } from './pagination/pagination.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

const E_MODULES =  [NgxPaginationModule, FormsModule, ReactiveFormsModule ];

@NgModule({
  declarations: [ConfirmModalComponent, PaginationComponent],
  imports: [
    CommonModule,
    NgxPaginationModule,
    BsDatepickerModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
  ],
  exports: [...E_MODULES, PaginationComponent],
  entryComponents: [ConfirmModalComponent]
})
export class ShareModule { }
