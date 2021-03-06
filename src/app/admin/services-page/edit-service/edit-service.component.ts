import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'src/app/services/alert.service';
import { apiKeyTiny } from 'src/app/_common/const';
import { AdminService } from '../../admin.service';
import { AngularFireStorage } from "@angular/fire/storage";
import { finalize } from "rxjs/operators";
import { Observable } from "rxjs";
@Component({
  selector: "app-edit-service",
  templateUrl: "./edit-service.component.html",
  styleUrls: ["./edit-service.component.scss"],
})
export class EditServiceComponent implements OnInit, OnDestroy {
  service = {
    title: "",
    description: "",
    image: "",
    price: "",
    about: "",
    details: "",
    time: "",
  };
  downloadURL: Observable<string>;
  apiKey = apiKeyTiny;
  isLoading = false;
  loading = false;
  submitted = false;
  selectedImg = '';
  existedImg = '';
  config = {
    height: 400,
    menubar: false,
    plugins: [
      "advlist autolink lists link image charmap print preview anchor",
      "searchreplace visualblocks code fullscreen",
      "insertdatetime media table paste code help wordcount",
    ],
    toolbar:
      "undo redo | formatselect | bold italic |  alignleft aligncenter alignright alignjustify | \
      bullist numlist outdent indent | removeformat | help",
  };

  serviceId: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adminService: AdminService,
    private alertService: AlertService,
    private spinner: NgxSpinnerService,
    private storage: AngularFireStorage
  ) {}

  ngOnInit() {
    this.serviceId = this.route.snapshot.paramMap.get("id");
    if (this.serviceId) {
      this.getService();
    }
  }

  ngOnDestroy() {
    if (this.selectedImg && !this.submitted) {
      this.storage.storage.refFromURL(this.selectedImg).delete();
    }
  }

  getService() {
    this.spinner.show();
    this.adminService.getServiceDetail(this.serviceId).subscribe(
      (res) => {
        this.service = res;
        this.existedImg = this.service.image;
        this.spinner.hide();
      },
      (err) => {
        console.error(err);
        this.spinner.hide();
        this.alertService.error(err.error);
      }
    );
  }

  submit(form) {
    form.control.markAllAsTouched();
    this.loading = true;
    if (form.valid) {
      this.submitted = true;
      if (this.serviceId) {
        this.updateService();
      } else {
        this.createService();
      }
    }
  }

  createService() {
    this.spinner.show();
    this.adminService.createService(this.service).subscribe(
      (res) => {
        this.alertService.success("Th??m m???i th??nh c??ng!");
        this.router.navigate(['admin/services']);
      },
      (err) => {
        this.spinner.hide();
        this.alertService.error("Th??m m???i th???t b???i!");
      }
    );
  }

  updateService() {
    this.spinner.show();
    this.adminService.updateService(this.serviceId, this.service).subscribe(
      (res) => {
        this.alertService.success("C???p nh???t th??nh c??ng!");
        if (this.existedImg && this.selectedImg) {
          this.storage.storage.refFromURL(this.existedImg).delete();
        }
        this.router.navigate(['admin/services'])
      },
      (err) => {
        this.spinner.hide();
        this.alertService.error("C???p nh???t th???t b???i!");
      }
    );
  }

  uploadImage(evt, input) {
    if (evt) {
      this.isLoading = true;
      const file = evt.target.files[0];
      var time = Date.now();
      const name = file.name.split(".");
      const filePath = `services/${name[0]}-${time}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(`services/${name[0]}-${time}`, file);
      task.snapshotChanges().pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe((url) => {
            if (url) {
              this.service.image = url;
              this.selectedImg = url;
              this.isLoading = false;
            }
          });
        })
      ).subscribe();
      input.value = '';
    }
  }
}
