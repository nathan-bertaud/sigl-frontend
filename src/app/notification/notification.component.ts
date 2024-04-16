import { Component } from '@angular/core';
import { NotificationService } from './notification.service';
import { ToastrService } from 'ngx-toastr';
import { AuthentificationService } from '../authentification/authentification.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApprenticeInfoService } from '../apprentice-info/apprentice-info.service';
import { Apprentice } from 'src/shared/models/Apprentice.model';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent {
  notifications: Notification[] = [];
  formNotification: FormGroup;
  apprenticeList: any[] = [];
  selectedApprentice: any = null;
  loading: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
    private toastr: ToastrService,
    private apprenticeInfoService: ApprenticeInfoService,
    private authService: AuthentificationService
  ) {
    this.apprenticeInfoService.getApprenticesInfo().subscribe(
      (response) => {
        this.apprenticeList = response.body;
      },
      (error) => {
        console.error('Erreur lors de la requête', error);
        this.toastr.error('Erreur lors du changement de mot passe', 'Erreur', {
          closeButton: true,
        });
      }
    );
    this.formNotification = this.formBuilder.group({
      content: ['', [Validators.required]],
      date: ['', Validators.required],
      author: ['', Validators.required],
    });
    this.notificationService.getNotifcations().subscribe(
      (response) => {
        this.notifications = response.body;
      },
      (error) => {
        console.error('Erreur lors de la requête', error);
        this.toastr.error(
          'Erreur lors du chargement des notifications',
          'Erreur',
          {
            closeButton: true,
          }
        );
      },
      () => {
        this.loading = false;
      }
    );
  }

  deleteNotification(notification: Notification) {
    const index = this.notifications.indexOf(notification);
    if (index !== -1) {
      this.notificationService.removeNotifcations(notification.id).subscribe(
        (response) => {
          this.notifications.splice(index, 1);
        },
        (error) => {
          console.error('Erreur lors de la requête', error);
          this.toastr.error(
            'Erreur lors de la suppression de la notification',
            'Erreur',
            {
              closeButton: true,
            }
          );
        }
      );
    }
  }

  NotificationAllApprentice() {
    if (this.formNotification.valid) {
      const content: string = this.formNotification.get('content')?.value;
      const author: string = this.formNotification.get('author')?.value;
      const date: string = this.formNotification.get('date')?.value;
      this.notificationService
        .newAllApprenticeNotifcations(content, author, date)
        .subscribe(
          (response) => {
            if (response.status === 204) {
              this.formNotification.reset;
              this.toastr.success(
                'La notification a été envoyée à tous les apprentis'
              );
            }
          },
          (error) => {
            console.error('Erreur lors de la requête', error);
            this.toastr.error(
              'Erreur lors de la suppression de la notification',
              'Erreur',
              {
                closeButton: true,
              }
            );
          }
        );
    }
  }

  Notification() {
    if (this.formNotification.valid) {
      const content: string = this.formNotification.get('content')?.value;
      const author: string = this.formNotification.get('author')?.value;
      const date: string = this.formNotification.get('date')?.value;
      const id: number = this.selectedApprentice!.id;

      this.notificationService
        .newNotifcations(content, author, date, id)
        .subscribe(
          (response) => {
            if (response.status === 204) {
              this.formNotification.reset;
              this.toastr.success(
                'La notification a été envoyée à ' +
                  this.selectedApprentice.firstName +
                  ' ' +
                  this.selectedApprentice.name
              );
            }
          },
          (error) => {
            console.error('Erreur lors de la requête', error);
            this.toastr.error(
              'Erreur lors de la suppression de la notification',
              'Erreur',
              {
                closeButton: true,
              }
            );
          }
        );
    }
  }

  hasRole(role: string): boolean {
    return this.authService.getRoles().includes(role);
  }
}

interface Notification {
  id: number;
  content: string;
  date: Date;
  author: string;
}
