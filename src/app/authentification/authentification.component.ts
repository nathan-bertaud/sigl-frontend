import { Component } from '@angular/core';
import { AuthentificationService } from './authentification.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { errorMessages } from 'src/shared/errorMessages';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css'],
})
export class AuthentificationComponent {
  constructor(
    private formBuilder: FormBuilder,
    private authentificationService: AuthentificationService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.formConnexion = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  formConnexion: FormGroup;

  ngOnInit() {}

  Connexion() {
    if (this.formConnexion.valid) {
      let email: string = this.formConnexion.get('email')?.value;
      email = email.toLowerCase();
      const password: string = this.formConnexion.get('password')?.value;
      this.authentificationService.verificationLogin(email, password).subscribe(
        (response) => {
          if (response.status === 200) {
            const token = response.body?.token;
            this.authentificationService.setInfo(token, response);
            this.router.navigate(['/home']);
          }
        },
        (error) => {
          console.error('Erreur lors de la requête', error);
          if (error.status === 403) {
            this.toastr.error(errorMessages.userNotExist, 'Erreur', {
              closeButton: true,
            });
            this.formConnexion.reset();
          } else {
            this.toastr.error(errorMessages.erreurHTTP, 'Erreur', { closeButton: true });
            this.formConnexion.reset();
          }
        }
      );
    } else {
      this.toastr.error(errorMessages.mailOrPasswordNotValid, 'Erreur', {
        closeButton: true,
      });
      this.formConnexion.reset();
    }
  }
}
