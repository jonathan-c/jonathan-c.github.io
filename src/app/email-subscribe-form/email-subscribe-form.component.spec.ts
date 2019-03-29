import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailSubscribeFormComponent } from './email-subscribe-form.component';

describe('EmailSubscribeFormComponent', () => {
  let component: EmailSubscribeFormComponent;
  let fixture: ComponentFixture<EmailSubscribeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailSubscribeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailSubscribeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
