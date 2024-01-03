import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CopyconfirmationComponent } from './copyconfirmation/copyconfirmation.component';
@Injectable({
  providedIn: 'root'
})
export class CopyconfirmationService {

  affiliateLink:any;

  constructor(private modalService: NgbModal) { }
  public confirm(
    affiliateLink:string,
    title: string,
    message: string,
    btnOkText: string = 'OK',
    btnCancelText: string = 'Cancel',
    dialogSize: 'sm' | 'lg' = 'lg'): Promise<boolean> {
    const modalRef = this.modalService.open(CopyconfirmationComponent, { size: dialogSize });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.affiliateLink = affiliateLink;
     modalRef.componentInstance.message = message;
    modalRef.componentInstance.btnOkText = btnOkText;
    modalRef.componentInstance.btnCancelText = btnCancelText;

    return modalRef.result;
  }
}
