import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpUpdateComponent } from './emp-update.component';

describe('EmpUpdateComponent', () => {
  let component: EmpUpdateComponent;
  let fixture: ComponentFixture<EmpUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
