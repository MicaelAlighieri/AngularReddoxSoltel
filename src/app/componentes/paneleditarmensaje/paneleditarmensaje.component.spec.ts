import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaneleditarmensajeComponent } from './paneleditarmensaje.component';

describe('PaneleditarmensajeComponent', () => {
  let component: PaneleditarmensajeComponent;
  let fixture: ComponentFixture<PaneleditarmensajeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaneleditarmensajeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaneleditarmensajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
