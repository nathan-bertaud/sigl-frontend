import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificatCerfaComponent } from './certificat-cerfa.component';

describe('CertificatCerfaComponent', () => {
  let component: CertificatCerfaComponent;
  let fixture: ComponentFixture<CertificatCerfaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CertificatCerfaComponent]
    });
    fixture = TestBed.createComponent(CertificatCerfaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
