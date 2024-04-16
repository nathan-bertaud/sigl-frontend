import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthentificationService } from "../authentification.service";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
  })
  export class EducationalTutorOrApprentiGuard {
    constructor(private authService: AuthentificationService,
        private router: Router) {}
  
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
      ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        const roles = this.authService.getRoles();
    
        if (roles.includes('ROLE_APPRENTI') || roles.includes('ROLE_TUTOR')) {
          return true;
        } else {
          this.router.navigate(['/unauthorized']);
          return false;
        }
      }

  }