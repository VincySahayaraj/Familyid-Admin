import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffiliatedmodalComponent } from './affiliatedmodal.component';

describe('AffiliatedmodalComponent', () => {
  let component: AffiliatedmodalComponent;
  let fixture: ComponentFixture<AffiliatedmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffiliatedmodalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AffiliatedmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
