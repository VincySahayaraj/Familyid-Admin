import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagehohComponent } from './managevisitor.component';

describe('ManagehohComponent', () => {
  let component: ManagehohComponent;
  let fixture: ComponentFixture<ManagehohComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagehohComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagehohComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
