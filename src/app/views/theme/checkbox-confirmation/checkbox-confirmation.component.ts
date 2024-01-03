import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-checkbox-confirmation',
  templateUrl: './checkbox-confirmation.component.html',
  styleUrls: ['./checkbox-confirmation.component.scss']
})
export class CheckboxConfirmationComponent {
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
