import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable()
export class ListeApprentisTuteurService {
  constructor(private http: HttpClient, private formBuilder: FormBuilder) {}

  private urlApprenticeInfo: string = '/api/apprentice-tutor/getapprentices';

  getListeApprentices(): Observable<HttpResponse<any>> {
    return this.http.get(this.urlApprenticeInfo, {
      observe: 'response',
    });
  }
}
