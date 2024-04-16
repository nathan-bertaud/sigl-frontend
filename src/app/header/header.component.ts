import { Component, Input } from '@angular/core';
import { AuthentificationService } from '../authentification/authentification.service';
import { NotificationService } from '../notification/notification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  lastName: string = sessionStorage.getItem('nom')!;
  firstName: string = sessionStorage.getItem('prenom')!;
  function: string = 'Role';
  notificationNumber: number = 0;

  constructor(
    private authentificationService: AuthentificationService,
    private notificationService: NotificationService
  ) {
    const roles = this.authentificationService.getRoles();
    if (roles.includes('ROLE_APPRENTI')) {
      this.function = 'Apprenti';
    } else if (roles.includes('ROLE_ADMIN')) {
      this.function = 'Administrateur';
    } else if (roles.includes('ROLE_HR')) {
      this.function = 'Ressource humaines';
    } else if (roles.includes('ROLE_MENTOR')) {
      this.function = "Maitre d'apprentissage";
    } else if (roles.includes('ROLE_TUTOR')){
      this.function = "Tuteur pédagogique";
    } else if (roles.includes('ROLE_COORDINATOR')){
      this.function = "Coordinatrice d'alternance";
    }
    else {
      this.function = 'Utilisateur';
    }
    this.notificationService.getNotifcations().subscribe((response) => {
      this.notificationNumber = response.body.length;
    });
  }

  signout() {
    this.authentificationService.logout();
  }
}
