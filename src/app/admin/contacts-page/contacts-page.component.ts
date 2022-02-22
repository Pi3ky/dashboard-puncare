import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/operators';
import { AlertService } from 'src/app/services/alert.service';
import { ConfirmModalComponent } from 'src/app/_components/confirm-modal/confirm-modal.component';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-contacts-page',
  templateUrl: './contacts-page.component.html',
  styleUrls: ['./contacts-page.component.scss']
})
export class ContactsPageComponent implements OnInit {
  sortDate = 0;
  listContact = [];
  listServices = [];
  searchService = {
    title: '',
    page_size: 10,
    page: 1,
    sort: '',
    dir: ''
  }
  configDRP = {
    containerClass: 'theme-blue',
    isAnimated: true
  }
  search = {
    name: '',
    sort: 'create_date',
    dir: '',
    service_id: '',
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
    this.getContacts();
    this.getListService();
  }

  getContacts() {
    this.spinner.show();
    this.adminService.getContacts(this.search).pipe(finalize(() => this.spinner.hide())).subscribe(
      res => {
        this.listContact = res.data;
        this.totalItems = res.total;
      },
      err => {
        this.alertService.error(err.error);
        console.error(err);
      }
    )
  }

  getListService() {
    this.spinner.show();
    this.adminService.getServices({}).pipe(finalize(() => this.spinner.hide())).subscribe(
      res => {
        this.listServices = res.data;
      },
      err => {
        console.error(err);
        this.alertService.error(err.error);
      }
    )
  }

  sortByDate() {
    this.search.sort = 'date_visit';
    if (this.sortDate === 0) {
      this.sortDate = 1;
      this.search.dir = 'asc';
    } else if (this.sortDate === 1) {
      this.sortDate = 2;
      this.search.dir = 'decr';
    } else if (this.sortDate === 2) {
      this.sortDate = 0;
      this.search.sort = 'create_date';
      this.search.dir = '';
    }
    this.getContacts();
  }

  removeContact(contact) {
    const modalConfirm = this.modalService.show(ConfirmModalComponent, {
      class: "modal-md modal-dialog-centered",
      initialState: {
        title: 'Xóa lịch hẹn',
        message: `Bạn có chắc muốn xóa lịch hẹn này?`
      }
    });
    modalConfirm.content.result.subscribe(
      isConfirm => {
        if (isConfirm) {
          this.spinner.show();
          this.adminService.deleteContact(contact._id).pipe(finalize(() => this.spinner.hide())).subscribe(
            res => {
              this.alertService.success("Đã xóa lịch hẹn!");
              this.getContacts();
            },
            err => {
              this.alertService.error(err.error);
            }
          )
        }
      })

  }

  changePage(page) {
    this.search.page = page.page;
    if (page.showRow) {
      this.search.page_size = page.showRow;
    }
    this.getContacts();
  }

}
