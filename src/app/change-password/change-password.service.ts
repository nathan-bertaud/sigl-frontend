import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class ChangePasswordService {

    constructor(private http: HttpClient) {}

    private urlSetPassword = '/api/setpassword'; 

    setPassword( password: string, newPassword:string): Observable<HttpResponse<any>> {
        const body = {password, newPassword};
        return this.http.post(this.urlSetPassword, body, { observe: 'response' });
    }

}