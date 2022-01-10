import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Subscription } from "rxjs";
import { AlertService } from "src/app/services/alert.service";

@Component({
  selector: "app-alert",
  templateUrl: "./alert.component.html",
  styleUrls: ["./alert.component.scss"],
})
export class AlertComponent implements OnInit {
  private subscription: Subscription;
  constructor(
    private alertService: AlertService,
    private toastr: ToastrService) {}

  ngOnInit() {
    this.subscription = this.alertService.getAlert().subscribe((message) => {
      switch (message && message.type) {
        case "success":
          this.toastr.success(message.text, 'Thành công!', message.option);
          break;
        case "error":
          this.toastr.error(message.text, 'Lỗi!', message.option);
          break;
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
