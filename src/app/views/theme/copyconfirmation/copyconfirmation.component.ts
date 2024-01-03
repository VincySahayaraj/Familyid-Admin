import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ClipboardService } from 'ngx-clipboard';
import { ManageaffiliatedComponent } from '../manageaffiliated/manageaffiliated.component';

@Component({
  selector: 'app-copyconfirmation',
  templateUrl: './copyconfirmation.component.html',
  styleUrls: ['./copyconfirmation.component.scss']
})
export class CopyconfirmationComponent {
  @Input() title: any;
   @Input() message: any;
  @Input() affiliateLink:any;
  @Input() btnOkText: any;
  @Input() btnCancelText: any;


  copyText:any=false;
  constructor(private activeModal: NgbActiveModal,private clipboardService: ClipboardService,private manageaffiliate:ManageaffiliatedComponent) { }

  ngOnInit() {
  }

  public decline() {
    this.manageaffiliate.getAffiliates();
    window.location.reload();
    this.activeModal.close(true);
  }

  public accept() {
    this.activeModal.close(true);
  }

  public dismiss() {
    this.activeModal.dismiss();
  }

  copyContent() {

    this.copyText = !this.copyText;
    this.clipboardService.copyFromContent(this.affiliateLink);
    this.activeModal.close(true);
    this.manageaffiliate.getAffiliates();
    window.location.reload();

  }
}
