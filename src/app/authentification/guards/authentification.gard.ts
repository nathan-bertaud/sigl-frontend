import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from '../authentification.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(
    private authentificationService: AuthentificationService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this.authentificationService.isAuthenticatedUser()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
