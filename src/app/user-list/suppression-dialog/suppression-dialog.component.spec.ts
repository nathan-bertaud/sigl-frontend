import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppressionDialogComponent } from './suppression-dialog.component';

describe('SuppressionDialogComponent', () => {
  let component: SuppressionDialogComponent;
  let fixture: ComponentFixture<SuppressionDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuppressionDialogComponent]
    });
    fixture = TestBed.createComponent(SuppressionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
