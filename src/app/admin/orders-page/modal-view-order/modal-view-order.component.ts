import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AlertService } from 'src/app/services/alert.service';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-modal-view-order',
  templateUrl: './modal-view-order.component.html',
  styleUrls: ['./modal-view-order.component.scss']
})
export class ModalViewOrderComponent implements OnInit {
  order: any;
  result = new Subject<any>();
  isLoading = false;
  constructor(
    private bsModalRef: BsModalRef,
    private adminService: AdminService,
    private alertService: AlertService,
  ) { }

  ngOnInit() {
  }

  close() {
    this.bsModalRef.hide();
  }

  removeOrder() {
    this.isLoading = true;
    this.adminService.deleteOrder(this.order._id).pipe(finalize(() => this.isLoading = false)).subscribe(
      res => {
        this.alertService.success("Đã xóa đơn hàng");
        this.result.next(true);
        this.close();
      },
      err => {
        this.alertService.error(err.error);
      }
    )
  }

  finishOrder() {
    this.isLoading = true;
    this.adminService.updateStatusOrder(this.order._id).pipe(finalize(() => this.isLoading = false)).subscribe(
      res => {
        this.alertService.success("Đã cập nhật trạng thái đơn hàng");
        this.result.next(true);
        this.close();
      },
      err => {
        this.alertService.error(err.error);
      }
    )
  }

}
