import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorCreateComponent } from './visitor-create.component';

describe('VisitorCreateComponent', () => {
  let component: VisitorCreateComponent;
  let fixture: ComponentFixture<VisitorCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitorCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitorCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
