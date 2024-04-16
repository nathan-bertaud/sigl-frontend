import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Vérifier si la requête est une requête de connexion
    if (request.url.endsWith('/api/login') && request.method === 'POST') {
        return next.handle(request);
      }
  
      // Ajouter le token aux autres requêtes
      const token = sessionStorage.getItem('token');
  
      if (token) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
  
      return next.handle(request);
  }
}
