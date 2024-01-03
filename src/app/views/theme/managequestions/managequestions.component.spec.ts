import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagequestionsComponent } from './managequestions.component';

describe('ManagequestionsComponent', () => {
  let component: ManagequestionsComponent;
  let fixture: ComponentFixture<ManagequestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagequestionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagequestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
