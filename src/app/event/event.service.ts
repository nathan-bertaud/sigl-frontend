import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = '/api'; 

  constructor(private http: HttpClient) { }

  createBiannualMeeting(startDate: string,endDate:string,place:string,semestre:string,title: string): Observable<any> {
    const url = `${this.apiUrl}/meeting/add`;
    const body = {startDate, endDate,place,semestre,title};
    return this.http.post(url, body,{ observe: 'response',responseType: 'text' });
  }
  createEvent(title: string,startDate: string,endDate:string,semestre:string): Observable<any> {
    const url = `${this.apiUrl}/event/add`;
    const body = {title,startDate, endDate,semestre};
    return this.http.post(url, body,{ observe: 'response',responseType: 'text' });
  }
}