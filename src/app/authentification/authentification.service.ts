import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthentificationService {
  private token: string | null = null;
  private connexionApi = '/api/login';

  constructor(private http: HttpClient, private router: Router) {}

  verificationLogin(
    email: string,
    password: string
  ): Observable<HttpResponse<any>> {
    const body = { email, password };
    return this.http.post(this.connexionApi, body, { observe: 'response' });
  }

  setInfo(token: string, response: HttpResponse<any>): void {
    const decodedToken: any = jwtDecode(token);
    sessionStorage.setItem('roles', decodedToken.roles);
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('nom', response.body?.lastName);
    sessionStorage.setItem('prenom', response.body?.firstName);
  }

  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  getRoles(): string[] {
    return this.separerRoles(
      sessionStorage.getItem('roles') ? sessionStorage.getItem('roles')! : ''
    );
  }

  separerRoles(chaineRoles: string): string[] {
    const roles: string[] = chaineRoles.split(',');
    const rolesPropres: string[] = roles.map((role) => role.trim());
    return rolesPropres;
  }

  logout(): void {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('prenom');
    sessionStorage.removeItem('nom');
    sessionStorage.removeItem('roles');
    sessionStorage.removeItem('id');
    this.router.navigate(['/login']);
  }

  isAuthenticatedUser(): boolean {
    if (this.getToken() !== null) {
      return true;
    }
    return false;
  }
}
