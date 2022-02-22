import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { DaterangepickerConfig } from 'ng2-daterangepicker';
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
  dateRange: string = 'Hôm nay';
  search = {
    name: '',
    sort: 'date_visit',
    dir: '',
    service_id: '',
    start_date: Date.parse(moment().startOf('days').toString()),
    end_date: Date.parse(moment().toString()),
    page: 1,
    page_size: 10
  };
  totalItems = 0;
  constructor(
    private adminService: AdminService,
    private alertService: AlertService,
    private spinner: NgxSpinnerService,
    private modalService: BsModalService,
    private daterangepickerOptions: DaterangepickerConfig,
  ) {
    this.daterangepickerOptions.settings = {
      locale: {
        customRangeLabel: 'Tùy chọn',
        format: 'DD/MM/YYYY',
        daysOfWeek: [
          "CN",
          "T2",
          "T3",
          "T4",
          "T5",
          "T6",
          "T7"
        ],
        monthNames: [
          "Tháng 1",
          "Tháng 2",
          "Tháng 3",
          "Tháng 4",
          "Tháng 5",
          "Tháng 6",
          "Tháng 7",
          "Tháng 8",
          "Tháng 9",
          "Tháng 10",
          "Tháng 11",
          "Tháng 12"
      ],
      },
      autoApply: true,
      buttonClasses: 'd-none',
      timePicker24Hour: true,
      ranges: {
        'Hôm nay': [moment().startOf('days'), moment()],
        'Hôm qua': [moment().subtract(1, 'days').startOf('days'), moment().subtract(1, 'days').endOf('days')],
        '7 ngày trước': [moment().subtract(7, 'days').startOf('days'), moment().subtract(1, 'days').endOf('days')],
        '7 ngày tiếp': [moment().startOf('days'), moment().add(7, 'days').endOf('days')],
        'Tháng này': [moment().startOf('month'), moment().endOf('month')],
      }
    };
  }

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

  selectedDaterange(evt) {
    this.dateRange = evt.label;
    if (evt.label === 'Custom Range') {
      this.dateRange = `${evt.start.format('MM/DD/yyyy')} - ${evt.end.format('MM/DD/yyyy')}`
    }
    this.search.start_date = Date.parse(evt.start);
    this.search.end_date = Date.parse(evt.end);
    this.getContacts();
  }

  changePage(page) {
    this.search.page = page.page;
    if (page.showRow) {
      this.search.page_size = page.showRow;
    }
    this.getContacts();
  }

}
