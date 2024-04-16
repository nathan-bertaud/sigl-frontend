import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiannualMeetingComponent } from './biannual-meeting.component';

describe('BiannualMeetingComponent', () => {
  let component: BiannualMeetingComponent;
  let fixture: ComponentFixture<BiannualMeetingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BiannualMeetingComponent]
    });
    fixture = TestBed.createComponent(BiannualMeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
