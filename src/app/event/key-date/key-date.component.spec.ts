import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeydateComponent } from './key-date.component';

describe('KeydateComponent', () => {
  let component: KeydateComponent;
  let fixture: ComponentFixture<KeydateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KeydateComponent]
    });
    fixture = TestBed.createComponent(KeydateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
