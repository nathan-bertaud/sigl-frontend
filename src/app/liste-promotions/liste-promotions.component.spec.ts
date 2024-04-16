import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListePromotionsComponent } from './liste-promotions.component';

describe('ListePromotionsComponent', () => {
  let component: ListePromotionsComponent;
  let fixture: ComponentFixture<ListePromotionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListePromotionsComponent]
    });
    fixture = TestBed.createComponent(ListePromotionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
