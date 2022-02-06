import { AlertService } from 'src/app/services/alert.service';
import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { PublicService } from 'src/app/services/public.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  requestChangePW = {
    newPassword: '',
    password: '',
    cfPassword: ''
  }
  submitted = false;
  currentUser: any;
  loading = false;
  constructor(
    private bsModalRef: BsModalRef,
    private publicService: PublicService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.currentUser = this.publicService.currentUserValue;
  }

  close(){
    this.bsModalRef.hide();
  }

  submit(form) {
    this.submitted = true;
    form.control.markAllAsTouched();
    if(form.valid) {
      this.loading = true;
      const body = {
        password: this.requestChangePW.password,
        newPassword: this.requestChangePW.newPassword,
      }
      this.publicService.updateUser(body, this.currentUser._id).subscribe(
        res => {
          this.alertService.success("Đổi mật khẩu thành công!")
          this.close();
        }, err => {
          console.error(err);
          this.alertService.error(err.error);
        }
      )
    }
  }

}
