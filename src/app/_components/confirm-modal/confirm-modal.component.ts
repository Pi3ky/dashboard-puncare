import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {
  title: string;
  message: string;
  result = new Subject<any>();
  submitted = false;
  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
  }

  confirm(): void {
    this.submitted = true;
    this.result.next(true);
    this.bsModalRef.hide();
  }

  cancel(): void {
    this.result.next(false);
    this.bsModalRef.hide();
  }

}
