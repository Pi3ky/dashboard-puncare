import { Component, OnInit } from '@angular/core';
import { AlertService } from '../services/alert.service';
import { PublicService } from '../services/public.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  session = {
    email: '',
    password: ''
  }
  submitted = false;
  constructor(
    private publicService: PublicService,
    private alertService: AlertService,
  ) { }

  ngOnInit() {
  }

  createSession(form) {
    form.control.markAllAsTouched();
    if (form.valid) {
      this.submitted = true;
      console.log(this.session)
      this.publicService.createSession(this.session).subscribe(
        res => {
          console.log(res)
        }, err => {
          this.submitted = false;
          console.error(err);
          this.alertService.error(err);
        }
      )
    }
  }

}
