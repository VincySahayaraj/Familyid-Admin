import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagehubspotComponent } from './managehubspot.component';

describe('ManagehubspotComponent', () => {
  let component: ManagehubspotComponent;
  let fixture: ComponentFixture<ManagehubspotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagehubspotComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagehubspotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
