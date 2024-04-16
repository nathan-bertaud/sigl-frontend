import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangepasswordDialogComponent } from './changepassword-dialog.component';

describe('ChangepasswordDialogComponent', () => {
  let component: ChangepasswordDialogComponent;
  let fixture: ComponentFixture<ChangepasswordDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChangepasswordDialogComponent]
    });
    fixture = TestBed.createComponent(ChangepasswordDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
