import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private router: Router
  ) { }

  ngOnInit() {
  }

  createSession(form) {
    form.control.markAllAsTouched();
    if (form.valid) {
      this.submitted = true;
      this.publicService.createSession(this.session).subscribe(
        res => {
          localStorage.setItem('token', JSON.stringify(res.token));
          this.publicService.setCurrentUserValue(res.user)
          this.router.navigate([''])
        }, err => {
          this.submitted = false;
          console.error(err);
          this.alertService.error(err.error);
        }
      )
    }
  }

}
