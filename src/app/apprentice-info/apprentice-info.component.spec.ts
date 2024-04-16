import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprenticeInfoComponent } from './apprentice-info.component';

describe('ApprenticeInfoComponent', () => {
  let component: ApprenticeInfoComponent;
  let fixture: ComponentFixture<ApprenticeInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApprenticeInfoComponent]
    });
    fixture = TestBed.createComponent(ApprenticeInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
