import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVivaComponent } from './edit-viva.component';

describe('EditVivaComponent', () => {
  let component: EditVivaComponent;
  let fixture: ComponentFixture<EditVivaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditVivaComponent]
    });
    fixture = TestBed.createComponent(EditVivaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
