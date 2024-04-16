import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensualNoteComponent } from './mensual-note.component';

describe('MensualNoteComponent', () => {
  let component: MensualNoteComponent;
  let fixture: ComponentFixture<MensualNoteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MensualNoteComponent]
    });
    fixture = TestBed.createComponent(MensualNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
