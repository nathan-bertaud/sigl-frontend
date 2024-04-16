import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { errorMessages } from 'src/shared/errorMessages';
import { CertificatCerfaService } from './certificat-cerfa.service';
import { Company } from 'src/shared/models/Company.model';

@Component({
  selector: 'app-certificat-cerfa',
  templateUrl: './certificat-cerfa.component.html',
  styleUrls: ['./certificat-cerfa.component.css']
})
export class CertificatCerfaComponent {
  constructor(private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private certificatCerfaService: CertificatCerfaService)
  {
    this.formEmployeur = this.formBuilder.group({
      nomEntreprise: ['', [Validators.required]],
      domaineEmployeur: ['', [Validators.required]],
      adresse: ['', Validators.required],
      codePostal: ['', Validators.required],
      commune: ['', Validators.required],
      telephone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      siret: ['', Validators.required],
      typeEmployeur: ['', Validators.required],
      employeurSpecifique: ['', Validators.required],
      codeNAF: ['', Validators.required],
      effectifSalarie: ['', Validators.required],
      conventionCollective: ['', Validators.required],
      codeIDCC: ['', Validators.required],
    });
  }

  formEmployeur: FormGroup;


  onSubmit() {
    if( this.formEmployeur.valid) {

      const nomEntreprise = this.formEmployeur.get('nomEntreprise')?.value;
      let privateCompany: boolean;
      let publicCompany: boolean;
      if (this.formEmployeur.get('domaineEmployeur')?.value === 'employeurPublic') {
        privateCompany = false;
        publicCompany = true;
      }
      else {
        privateCompany = true;
        publicCompany = false;
      }
      const adresse = this.formEmployeur.get('adresse')?.value;
      const codePostal = this.formEmployeur.get('codePostal')?.value;
      const commune = this.formEmployeur.get('commune')?.value;
      const telephone = this.formEmployeur.get('telephone')?.value;
      const email = this.formEmployeur.get('email')?.value;
      const siret = this.formEmployeur.get('siret')?.value;
      const typeEmployeur = this.formEmployeur.get('typeEmployeur')?.value;
      const employeurSpecifique = this.formEmployeur.get('employeurSpecifique')?.value;
      const codeNAF = this.formEmployeur.get('codeNAF')?.value;
      const effectifSalarie = this.formEmployeur.get('effectifSalarie')?.value;
      const conventionCollective = this.formEmployeur.get('conventionCollective')?.value;
      const codeIDCC = this.formEmployeur.get('codeIDCC')?.value;

      let company: Company = new Company(
        privateCompany,
        publicCompany,
        nomEntreprise,
        adresse,
        codePostal,
        commune,
        telephone,
        email,
        siret,
        typeEmployeur,
        employeurSpecifique,
        codeNAF,
        effectifSalarie,
        conventionCollective,
        codeIDCC
      );

        this.certificatCerfaService.addCompany(company).subscribe(

          (response: any) => {
            this.toastr.success('Contrat rempli avec succès', 'Succès');
          },
          (error: any) => {
                this.toastr.error('Erreur lors de la soumission du contrat', 'Erreur', { closeButton: true });
            } 
        );
    } else {
      this.toastr.error(errorMessages.invalidForm, 'Erreur', { closeButton: true });
    }
  }

}
