import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyresultmodalComponent } from './familyresultmodal.component';

describe('FamilyresultmodalComponent', () => {
  let component: FamilyresultmodalComponent;
  let fixture: ComponentFixture<FamilyresultmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FamilyresultmodalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FamilyresultmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
