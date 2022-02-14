import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/operators';
import { AlertService } from '../services/alert.service';
import { PublicService } from '../services/public.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  submitted = false;
  forgotForm = {
    email: ''
  }
  constructor(
    private publicService: PublicService,
    private spinner: NgxSpinnerService,
    private alertService: AlertService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  createRequest(form) {
    form.control.markAllAsTouched();
    this.submitted = true;
    if(form.valid) {
      this.spinner.show();
      this.publicService.forgotPassword(this.forgotForm).pipe(finalize(() => this.spinner.hide())).subscribe(
        res => {
          this.alertService.success(res);
          this.router.navigate(['/login'])
        }, err => {
          console.error(err)
          this.alertService.error(err.error);
          this.submitted = false;
        }
      )
    }
  }

}
