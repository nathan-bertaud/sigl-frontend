import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pagination } from 'src/shared/models/Pagination.model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private apiUrl = '/api'; 

  constructor(private http: HttpClient) { }

  getAllEventByApprentice(page: number, size: number): Observable<Pagination> {
    const url = `${this.apiUrl}/apprentice/getevents`;
    return this.http.get<Pagination>(url,{ params: { page, size }});
  }
}