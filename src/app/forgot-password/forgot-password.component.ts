import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  submitted = false;
  email: string = '';
  constructor() { }

  ngOnInit() {
  }

  createRequest(form) {
    form.control.markAllAsTouched();
    if(form.valid) {
      this.submitted = true;
      console.log(this.email)
    }
  }

}
