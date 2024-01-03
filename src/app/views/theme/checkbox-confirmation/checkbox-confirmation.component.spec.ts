import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxConfirmationComponent } from './checkbox-confirmation.component';

describe('CheckboxConfirmationComponent', () => {
  let component: CheckboxConfirmationComponent;
  let fixture: ComponentFixture<CheckboxConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckboxConfirmationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckboxConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
