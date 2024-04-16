import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment'; 
import { UserRequest } from 'src/shared/models/UserRequest.model';
import { Pagination } from 'src/shared/models/Pagination.model';

@Injectable({
  providedIn: 'root'
})
export class UserListService {

  constructor(private http: HttpClient,
    private formBuilder: FormBuilder) {
}

private urlGetUsers = '/api/getusers';
private urlDeleteUser = '/api/deleteuser/';
private urlGetIdUser = '/api/getuserbyid';
private urlChangePasswordById = '/api/setPasswordByID/'


getUsers(page: number, size: number): Observable<Pagination> {
  if (environment.useMock) {
    return this.http.get<Pagination>('assets/mocks/users/getUsers.json');
  } else {
    return this.http.get<Pagination>(this.urlGetUsers, { params: { page, size } });
  }
}

deleteUserById(id: number): Observable<any> {
  return this.http.post(this.urlDeleteUser + id,  { observe: 'response' });
}

getIdUser(user: UserRequest): Observable<HttpResponse<any>> {
  return this.http.post<any>(this.urlGetIdUser, user, { observe: 'response' });
}

changePasswordById(id: number, newPassword: string): Observable<any> {
  const body = {newPassword};
  return this.http.post(this.urlChangePasswordById + id, body, { observe: 'response'});
}

}
