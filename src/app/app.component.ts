import { Component } from '@angular/core';
import { PublicService } from './services/public.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentUser: any;
  constructor(
    private publicService: PublicService
  ){
    this.publicService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }
}
