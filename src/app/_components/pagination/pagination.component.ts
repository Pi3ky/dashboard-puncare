import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { PaginationControlsComponent } from 'ngx-pagination';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent extends PaginationControlsComponent implements OnInit, OnDestroy {
  @Input() templateId = 'custom_page';
  @Input() templateClass: string = 'justify-content-end';
  @Input() totalItems: number;
  @Input() currentRow = 10;
  @Input() enableSelectSize: boolean = true;
  @Input() pageSize = [ 10, 15, 20, 50 ];
  @Output() pageChange = new EventEmitter<any>();
  @Output() rowChange = new EventEmitter<any>();

  currentPage = 1;

  constructor() { super() }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.currentRow = 10;
    this.currentPage = 1;
  }

  change(page) {
    this.currentPage = page;
    this.pageChange.emit({ page: page });
  }

  setRows(numRow) {
    this.currentRow = numRow;
    this.pageChange.emit({ page: 1, showRow: numRow });
  }
}
