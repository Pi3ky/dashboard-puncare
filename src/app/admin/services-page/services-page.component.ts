import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/operators';
import { AlertService } from 'src/app/services/alert.service';
import { Services } from 'src/app/_common/types';
import { ConfirmModalComponent } from 'src/app/_components/confirm-modal/confirm-modal.component';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-services-page',
  templateUrl: './services-page.component.html',
  styleUrls: ['./services-page.component.scss']
})
export class ServicesPageComponent implements OnInit {
  listServices: Services[] = [];
  search = {
    title: '',
    page_size: 10,
    page: 1,
    sort: '',
    dir: ''
  }
  sortName = 0;
  sortPrice = 0;
  totalItems = 0;
  constructor(
    private spinner: NgxSpinnerService,
    private modalService: BsModalService,
    private router: Router,
    private adminService: AdminService,
    private alertService: AlertService,
  ) { }

  ngOnInit() {
    this.getServices();
  }

  /**
   * Get data services
   */
  getServices(){
    this.spinner.show();
    this.adminService.getServices(this.search).pipe(finalize(() => this.spinner.hide())).subscribe(
      res => {
        this.listServices = res.data;
        this.totalItems = res.total;
      },
      err => {
        console.error(err);
      }
    )
  }

  sortByPrice() {
    this.search.sort = 'price';
    this.sortName = 0;
    if (this.sortPrice === 0) {
      this.sortPrice = 1;
      this.search.dir = 'asc';
    } else if (this.sortPrice === 1) {
      this.sortPrice = 2;
      this.search.dir = 'decr';
    } else if (this.sortPrice === 2) {
      this.sortPrice = 0;
      this.search.dir = '';
    }
    this.getServices();
  }

  sortByTitle() {
    this.search.sort = 'title';
    this.sortPrice = 0;
    if (this.sortName === 0) {
      this.sortName = 1;
      this.search.dir = 'asc';
    } else if (this.sortName === 1) {
      this.sortName = 2;
      this.search.dir = 'decr';
    } else if (this.sortName === 2) {
      this.sortName = 0;
      this.search.dir = '';
    }
    this.getServices();
  }

  editService(service: Services) {
    this.router.navigate(['/admin/services', service._id])
  }

  removeService(service) {
    const confirmRemove = this.modalService.show(ConfirmModalComponent, {
      class: "modal-md modal-dialog-centered",
      initialState: {
        title: 'Xóa dịch vụ',
        message: `Bạn có chắc muốn xóa dịch vụ ${service.title}`
      }
    });
    confirmRemove.content.result.subscribe(
      isConfirm => {
        if (isConfirm) {
          this.spinner.show();
          this.adminService.removeService(service._id).subscribe(
            res => {
              this.spinner.hide();
              this.alertService.success('Xóa dịch vụ thành công!');
              this.getServices();
            },
            err => {
              this.spinner.hide();
              this.alertService.success('Xóa dịch vụ thất bại!');
            }
          )
        }
      }
    )
  }

  changePage(page) {
    this.search.page = page.page;
    if (page.showRow) {
      this.search.page_size = page.showRow;
    }
    this.getServices();
  }

}
