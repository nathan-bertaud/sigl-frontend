import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ApprenticeInfoService {
  private apprenticeInfo: string = '/api/apprentice-mentor/apprentices';

  constructor(private http: HttpClient, private router: Router) {}

  getApprenticesInfo(): Observable<HttpResponse<any>> {
    return this.http.get(this.apprenticeInfo, {
      observe: 'response',
    });
  }
}
