import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyconfirmationComponent } from './copyconfirmation.component';

describe('CopyconfirmationComponent', () => {
  let component: CopyconfirmationComponent;
  let fixture: ComponentFixture<CopyconfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CopyconfirmationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CopyconfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
