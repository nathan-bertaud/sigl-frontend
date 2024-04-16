import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Apprentice } from 'src/shared/models/Apprentice.model';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notifications: string = '/api/notifications';

  constructor(private http: HttpClient, private router: Router) {}

  getNotifcations(): Observable<HttpResponse<any>> {
    return this.http.get(this.notifications + '/get', {
      observe: 'response',
    });
  }

  newNotifcations(
    content: String,
    author: String,
    date: String,
    id: number
  ): Observable<HttpResponse<any>> {
    const body = { id, content, author, date };
    return this.http.post(this.notifications + '/add', body, {
      observe: 'response',
    });
  }

  newAllApprenticeNotifcations(content: string, author: string, date: string) {
    const body = { content, author, date };
    return this.http.post(this.notifications + '/addAllApprentice', body, {
      observe: 'response',
    });
  }

  removeNotifcations(index: number): Observable<HttpResponse<any>> {
    return this.http.post(this.notifications + `/delete/${index}`, undefined, {
      observe: 'response',
    });
  }
}
