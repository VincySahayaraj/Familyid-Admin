

import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-confirmation',
  templateUrl: './edit-confirmation.component.html',
  styleUrls: ['./edit-confirmation.component.scss']
})
export class EditConfirmationComponent implements OnInit{
  @Input() title: any;
  @Input() message: any;
  @Input() btnOkText: any;
  @Input() btnCancelText: any;

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  public decline() {
    this.activeModal.dismiss(false);
  }

  public accept() {
    this.activeModal.close(true);
  }

  public dismiss() {
    this.activeModal.dismiss();
  }
}
