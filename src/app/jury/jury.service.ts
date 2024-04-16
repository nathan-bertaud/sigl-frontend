import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserNameFirstNameDto } from 'src/shared/models/UserNameFirstNameDto.model';

@Injectable({
  providedIn: 'root',
})
export class JuryService {
  constructor(private http: HttpClient) {}

  private apiUrl = '/api';

  ajouterJury(juries: UserNameFirstNameDto[]):Observable<any>{
    const url = `${this.apiUrl}/viva/addJuries`;
    const body = {juries};
    return this.http.post(url, body,{ observe: 'response',responseType: 'text' });
  }
}
