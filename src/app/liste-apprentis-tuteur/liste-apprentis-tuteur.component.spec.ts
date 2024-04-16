import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeApprentisTuteurComponent } from './liste-apprentis-tuteur.component';

describe('ListeApprentisTuteurComponent', () => {
  let component: ListeApprentisTuteurComponent;
  let fixture: ComponentFixture<ListeApprentisTuteurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeApprentisTuteurComponent]
    });
    fixture = TestBed.createComponent(ListeApprentisTuteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
