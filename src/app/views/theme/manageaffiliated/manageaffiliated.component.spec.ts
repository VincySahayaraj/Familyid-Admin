import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageaffiliatedComponent } from './manageaffiliated.component';

describe('ManageaffiliatedComponent', () => {
  let component: ManageaffiliatedComponent;
  let fixture: ComponentFixture<ManageaffiliatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageaffiliatedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageaffiliatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
