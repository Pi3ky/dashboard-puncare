import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminService } from '../admin.service';
import { finalize } from 'rxjs/operators';
import { AlertService } from 'src/app/services/alert.service';
import { ConfirmModalComponent } from 'src/app/_components/confirm-modal/confirm-modal.component';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss']
})
export class ProductsPageComponent implements OnInit {
  TOY_ID = "61cc2d054922a34fdb8e02e9";
  FOOD_ID = "61cc2da84922a34fdb8e02eb";

  sortName = 0;
  sortPrice = 0;
  totalItems = 0;
  search = {
    title: '',
    page: 1,
    page_size: 10,
    sort: '',
    dir: '',
    type_id: '',
  }
  listType = []

  listProducts = [];
  constructor(
    private spinner: NgxSpinnerService,
    private modalService: BsModalService,
    private router: Router,
    private storage: AngularFireStorage,
    private adminService: AdminService,
    private alertService: AlertService,
  ) { }

  ngOnInit() {
    this.getProducts();
    this.getTypeProduct();
  }

  getProducts() {
    this.spinner.show();
    this.adminService.getProducts(this.search).pipe(finalize(() => this.spinner.hide())).subscribe(
      res => {
        this.listProducts = res.data;
        this.totalItems = res.total;
      },
      err => {
        console.error(err);
        this.alertService.error(err.error);
      }
    )
  }

  getTypeProduct() {
    this.adminService.getTypeProduct().subscribe(res => {
      this.listType = res;
    },
    err => {
      console.error(err);
      this.alertService.error(err.error);
    });
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
    this.getProducts();
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
    this.getProducts();
  }

  editProduct(product){
    this.router.navigate(['/admin/products', product._id])
  }

  removeProduct(product){
    const confirmRemove = this.modalService.show(ConfirmModalComponent, {
      class: "modal-md modal-dialog-centered",
      initialState: {
        title: 'Xóa sản phẩm',
        message: `Bạn có chắc muốn xóa sản phẩm ${product.title}`
      }
    });
    confirmRemove.content.result.subscribe(
      isConfirm => {
        if (isConfirm) {
          this.spinner.show();
          this.adminService.removeProduct(product._id).subscribe(
            res => {
              if (product.image) {
                this.storage.storage.refFromURL(product.image).delete();
              }
              this.spinner.hide();
              this.alertService.success('Xóa sản phẩm thành công!');
              this.getProducts();
            },
            err => {
              this.spinner.hide();
              this.alertService.error(err.error);
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
    this.getProducts();
  }

}
