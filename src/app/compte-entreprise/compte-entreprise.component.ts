import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompteEntrepriseService } from './compte-entreprise.service';
import { HumanResources } from 'src/shared/models/HumanResources.model';
import { ToastrService } from 'ngx-toastr';
import { HttpResponse } from '@angular/common/http';
import { errorMessages } from 'src/shared/errorMessages';

@Component({
  selector: 'app-compte-entreprise',
  templateUrl: './compte-entreprise.component.html',
  styleUrls: ['./compte-entreprise.component.css'],
})
export class CompteEntrepriseComponent {
  constructor(
    private formBuilder: FormBuilder,
    private compteEntrepriseService: CompteEntrepriseService,
    private toastr: ToastrService
  ) {
    this.formCreationCompteEntreprise = this.formBuilder.group({
      companyName: ['', [Validators.required]],
      email: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmNewPassword: ['', Validators.required],
    }, { validator: this.passwordMatchValidator });
  }

  formCreationCompteEntreprise: FormGroup<any>;


  creationCompteEntreprise() {
    if (this.formCreationCompteEntreprise.valid) {
      const companyName =
        this.formCreationCompteEntreprise.get('companyName')?.value;
      const email = this.formCreationCompteEntreprise.get('email')?.value;
      const password =
        this.formCreationCompteEntreprise.get('confirmNewPassword')?.value;

      let humanResources: HumanResources = new HumanResources(
        "",
        "",
        new Date,
        email,
        password,
        companyName,
        [],
      );

      this.compteEntrepriseService
        .compteEntrepriseCreation(humanResources)
        .subscribe(
          (response: HttpResponse<any>) => {
            const responseBody = response.body;
            if (responseBody && responseBody.message === "Compte entreprise partenaire créé avec succès") {
              this.toastr.success(errorMessages.accountCreationSuccess, 'Succès', { closeButton: true });
              this.formCreationCompteEntreprise.reset();
            }
          },
          (error) => {
            if (error.status === 409) {
              this.toastr.error(errorMessages.emailAlreadyExists, 'Erreur', { closeButton: true });
              this.formCreationCompteEntreprise.reset();
            } else {
              this.toastr.error(errorMessages.creationError, 'Erreur', { closeButton: true });
              this.formCreationCompteEntreprise.reset();
            }
          }
        );
    }
    else {
      if (this.formCreationCompteEntreprise.get('newPassword')?.value !=
        this.formCreationCompteEntreprise.get('confirmNewPassword')?.value) {
        this.toastr.error(errorMessages.passwordMismatch, 'Erreur', { closeButton: true });
      }
      else {
        this.toastr.error(errorMessages.invalidForm, 'Erreur', { closeButton: true });
      }
    }
  }

  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('newPassword');
    const confirmPassword = control.get('confirmNewPassword');

    if (!password || !confirmPassword) {
      return null;
    }

    return password.value === confirmPassword.value ? null : { 'passwordMismatch': true };
  }
}
