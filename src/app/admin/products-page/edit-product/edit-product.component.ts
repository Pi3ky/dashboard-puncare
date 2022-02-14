import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { AlertService } from 'src/app/services/alert.service';
import { apiKeyTiny } from 'src/app/_common/const';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit, OnDestroy{
  productId: string;
  FOOD_ID = "61cc2da84922a34fdb8e02eb";
  selectedImg = '';
  existedImg = '';
  apiKey = apiKeyTiny;
  isLoading = false;
  downloadURL: Observable<string>;
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
  submitted: boolean = false;
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
    private router: Router,
    private adminService: AdminService,
    private alertService: AlertService,
    private spinner: NgxSpinnerService,
    private storage: AngularFireStorage
  ) { }

  ngOnInit() {
    this.getTypeProduct();
    this.productId = this.route.snapshot.paramMap.get('id');
    if (this.productId) {
      this.getProduct();
    }
  }

  ngOnDestroy() {
    if (this.selectedImg && !this.submitted) {
      this.storage.storage.refFromURL(this.selectedImg).delete();
    }
  }

  getProduct() {
    this.spinner.show();
    this.adminService.getProductsDetail(this.productId).subscribe(
      res => {
        this.product = res;
        this.existedImg = this.product.image;
        this.spinner.hide();
      }, err => {
        console.error(err);
        this.spinner.hide();
        this.alertService.error(err.error);
      }
    );
  }

  getTypeProduct() {
    this.adminService.getTypeProduct().subscribe(res => {
      this.typeProduct = res;
    },
    err => {
      console.error(err);
      this.alertService.error(err.error);
    });
  }

  createProduct() {
    this.spinner.show();
    this.product.image = this.selectedImg;
    this.adminService.createProduct(this.product).subscribe(
      res => {
        this.alertService.success('Thêm mới thành công!');
        this.router.navigate(['admin/products'])
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
      this.submitted = true;
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
    this.product.image = this.selectedImg;
    this.adminService.updateProduct(this.productId, this.product).subscribe(
      res => {
        this.alertService.success('Cập nhật thành công!');
        if (this.existedImg) {
          this.storage.storage.refFromURL(this.existedImg).delete();
        }
        this.router.navigate(['admin/products'])
      },
      err => {
        this.spinner.hide();
        this.alertService.error('Cập nhật thất bại!');
      }
    )
  }

  uploadImage(evt, input) {
    if (evt) {
      this.isLoading = true;
      const file = evt.target.files[0];
      var time = Date.now();
      const name = file.name.split(".");
      const filePath = `products/${name[0]}-${time}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(`products/${name[0]}-${time}`, file);
      task.snapshotChanges().pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe((url) => {
            if (url) {
              this.selectedImg = url;
              this.product.image = url
              this.isLoading = false;
            }
          });
        })
      ).subscribe();
      input.value = '';
    }
  }

}
