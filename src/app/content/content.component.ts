import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from '../authentification/authentification.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
})
export class ContentComponent {
  collapsed: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthentificationService
  ) {}

  collapse() {
    this.collapsed = !this.collapsed;
  }

  currentPage: string = '';

  hasRole(role: string): boolean {
    return this.authService.getRoles().includes(role);
  }
}
