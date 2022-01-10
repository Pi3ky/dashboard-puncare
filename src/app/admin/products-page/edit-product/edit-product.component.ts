import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

import { AlertService } from 'src/app/services/alert.service';
import { apiKeyTiny } from 'src/app/_common/const';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  productId: string;
  FOOD_ID = "61cc2da84922a34fdb8e02eb";
  apiKey = apiKeyTiny;
  config = {
    height: 400,
    menubar: false,
    plugins: [
      'advlist autolink lists link image charmap print preview anchor',
      'searchreplace visualblocks code fullscreen',
      'insertdatetime media table paste code help wordcount'
    ],
    toolbar:
      'undo redo | formatselect | bold italic | \ alignleft aligncenter alignright alignjustify | \
      bullist numlist outdent indent | removeformat | help'
  }
  typeProduct = [];
  product = {
    title: '',
    image: '',
    type_id: null,
    type_name: '',
    price: '',
    details: '',
    weight: ''
  };
  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService,
    private alertService: AlertService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit() {
    this.getTypeProduct();
    this.productId = this.route.snapshot.paramMap.get('id');
    if (this.productId) {
      this.getProduct();
    }
  }

  getProduct() {
    this.spinner.show();
    this.adminService.getProductsDetail(this.productId).subscribe(
      res => {
        this.product = res;
        this.spinner.hide();
      }, err => {
        console.error(err);
        this.spinner.hide();
        this.alertService.error(err);
      }
    );
  }

  getTypeProduct() {
    this.adminService.getTypeProduct().subscribe(res => {
      this.typeProduct = res;
    },
    err => {
      console.error(err);
      this.alertService.error(err)
    });
  }

  createProduct() {
    this.spinner.show();
    this.adminService.createProduct(this.product).subscribe(
      res => {
        this.alertService.success('Thêm mới thành công!');
        this.spinner.hide();
      },
      err => {
        this.spinner.hide();
        this.alertService.error('Thêm mới thất bại!');
      }
    )
  }


  submit(form) {
    form.control.markAllAsTouched();
    if (form.valid) {
      if (this.productId) {
        this.updateProduct();
      } else {
        this.createProduct();
      }
    }
  }

  selectType(evt) {
    this.product.type_name = this.typeProduct.find(type => type._id === evt).type_name;
  }

  updateProduct() {
    this.spinner.show();
    this.adminService.updateProduct(this.productId, this.product).subscribe(
      res => {
        this.alertService.success('Cập nhật thành công!');
        this.spinner.hide();
      },
      err => {
        this.spinner.hide();
        this.alertService.error('Cập nhật thất bại!');
      }
    )
  }

}
