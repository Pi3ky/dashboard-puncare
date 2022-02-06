import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/operators';
import { AlertService } from 'src/app/services/alert.service';
import { AdminService } from '../admin.service';
import { ModalViewOrderComponent } from './modal-view-order/modal-view-order.component';

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.scss']
})
export class OrdersPageComponent implements OnInit {
  sortDate = 0;
  listOrder = [];
  statusOrder = [
    { id: 'created', name: 'Mới tạo' },
    { id: 'shipped', name: 'Đã vận chuyển' },
  ]
  search = {
    name: '',
    sort: '',
    dir: '',
    status: '',
    page: 1,
    page_size: 20
  };
  totalItems = 0;
  constructor(
    private adminService: AdminService,
    private alertService: AlertService,
    private spinner: NgxSpinnerService,
    private modalService: BsModalService,
  ) { }

  ngOnInit() {
    this.getOrders();
  }

  getOrders(){
    this.spinner.show();
    this.adminService.getOrders(this.search).pipe(finalize(() => this.spinner.hide())).subscribe(
      res => {
        this.listOrder = res.data;
        this.totalItems = res.total;
      },
      err => {
        console.error(err);
        this.alertService.error(err.error)
      }
    )
  }

  sortByDate() {
    this.search.sort = 'create_date';
    if (this.sortDate === 0) {
      this.sortDate = 1;
      this.search.dir = 'asc';
    } else if (this.sortDate === 1) {
      this.sortDate = 2;
      this.search.dir = 'decr';
    } else if (this.sortDate === 2) {
      this.sortDate = 0;
      this.search.dir = '';
    }
    this.getOrders();
  }

  finishOrder(order) {
    this.spinner.show();
    this.adminService.updateStatusOrder(order._id).pipe(finalize(() => this.spinner.hide())).subscribe(
      res => {
        this.alertService.success("Đã cập nhật trạng thái đơn hàng");
        this.getOrders();
      },
      err => {
        this.alertService.error(err.error);
      }
    )
  }

  removeOrder(order) {
    this.spinner.show();
    this.adminService.deleteOrder(order._id).pipe(finalize(() => this.spinner.hide())).subscribe(
      res => {
        this.alertService.success("Đã xóa đơn hàng");
        this.getOrders();
      },
      err => {
        this.alertService.error(err.error);
      }
    )
  }

  changePage(page) {
    this.search.page = page.page;
    if (page.showRow) {
      this.search.page_size = page.showRow;
    }
    this.getOrders();
  }

  openOrder(order){
    const viewModal = this.modalService.show(ModalViewOrderComponent, {
      class: "modal-lg modal-dialog-centered",
      initialState: {
        order: order
      }
    });
    viewModal.content.result.subscribe(
      result => {
        if (result) {
          this.getOrders();
        }
      }
    )
  }

}
