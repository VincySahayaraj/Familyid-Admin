import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-familyresultmodal',
  templateUrl: './familyresultmodal.component.html',
  styleUrls: ['./familyresultmodal.component.scss']
})
export class FamilyresultmodalComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal){
    
  }

  ngOnInit() {}

}
