
import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteConfirmationComponent } from './delete-confirmation/delete-confirmation.component'
import { EditConfirmationComponent } from './edit-confirmation/edit-confirmation.component';

@Injectable({
  providedIn: 'root'
})
export class EditconfirmationService {


  constructor(private modalService: NgbModal) { }

  public confirm(
    title: string,
    message: string,
    btnOkText: string = 'OK',
    btnCancelText: string = 'Cancel',
    dialogSize: 'sm' | 'lg' = 'lg'): Promise<boolean> {
    const modalRef = this.modalService.open(EditConfirmationComponent, { size: dialogSize });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.btnOkText = btnOkText;
    modalRef.componentInstance.btnCancelText = btnCancelText;

    return modalRef.result;
  }
}
