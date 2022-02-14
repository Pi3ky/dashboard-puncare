import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { AlertService } from 'src/app/services/alert.service';
import { PublicService } from 'src/app/services/public.service';
import { ChangePasswordComponent } from '../change-password/change-password.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentUser: any;
  constructor(
    private publicService: PublicService,
    private alertService: AlertService,
    private modalService: BsModalService,
    private router: Router
  ) { }

  ngOnInit() {
    this.currentUser = this.publicService.currentUserValue;
  }

  logout() {
    const token = JSON.parse(localStorage.getItem('token'));
    const param = {
      _id: this.currentUser._id,
      token: token
    }
    this.publicService.logout(param).subscribe(
      res => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        this.publicService.currentUserSubject.next(null);
        this.router.navigate(['/login']);
      },
      err => {
        this.alertService.error(err.error);
        console.error(err)
      }
    )
  }

  changePW(){
    this.modalService.show(ChangePasswordComponent, {
      class: "modal-md modal-dialog-centered",
    })
  }
}
