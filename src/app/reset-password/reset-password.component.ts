import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from '../services/alert.service';
import { PublicService } from '../services/public.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetForm = {
    password: '',
    cfPassword: ''
  }
  submitted = false;
  userId: string = '';
  loading = false;
  constructor(
    private publicService: PublicService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(
      res => {
        this.userId = res._id;
      }
    )
  }

  submit(form){
    form.control.markAllAsTouched();
    this.submitted = true;
    if (form.valid) {
      this.loading = true;
      this.spinner.show();
      const body = {
        password: this.resetForm.password
      }
      this.publicService.resetPassword(body, this.userId).subscribe(
        res => {
          this.router.navigate([''])
          this.spinner.hide();
        }, err => {
          console.error(err);
          this.loading = false;
          this.spinner.hide();
          this.alertService.error(err.error);
        }
      )
    }
  }
}
