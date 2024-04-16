import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ChangePasswordService } from './change-password.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  formulaireChangePWD: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private changePasswordService: ChangePasswordService) {
    this.formulaireChangePWD = this.formBuilder.group({
      password: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmNewPassword: ['', Validators.required],
    });
  }

  ngOnInit() {}

ChangePassword(){

    if (this.formulaireChangePWD.valid) {
      const password = this.formulaireChangePWD.get('password')?.value;
      const newPassword = this.formulaireChangePWD.get('newPassword')?.value;
      const confirmNewPassword = this.formulaireChangePWD.get('confirmNewPassword')?.value;
      if(newPassword !== confirmNewPassword){
        this.formulaireChangePWD.reset();
        this.toastr.error('La confirmation du nouveau mot de passe n\'est pas valide', 'Erreur', { closeButton: true })
      }
      else{
        this.changePasswordService.setPassword( password, newPassword).subscribe(        
          (response) => {
                      
            if (response.status === 204) {
              this.formulaireChangePWD.reset();
              this.toastr.success('Le mot de passe a bien été changé', 'Succès', {closeButton: true})
            }
          },
        (error) => {
          console.error("Erreur lors de la requête", error);
          this.toastr.error('Erreur lors du changement de mot passe', 'Erreur', { closeButton: true})});
      }
      
      
    }

  }

}
