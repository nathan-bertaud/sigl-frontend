import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Apprentice } from 'src/shared/models/Apprentice.model';
import { ListeApprentisTuteurService } from './liste-apprentis-tuteur.service';
import { Router } from '@angular/router';
import { CreateUserService } from '../create-user/create-user.service';
import { ApprenticeIdService } from 'src/shared/services/ApprenticeId.service';

@Component({
  selector: 'app-liste-apprentis-tuteur',
  templateUrl: './liste-apprentis-tuteur.component.html',
  styleUrls: ['./liste-apprentis-tuteur.component.css'],
})
export class ListeApprentisTuteurComponent {
  apprenticeList: Apprentice[] = [];
  loading: boolean = true;
  selectedApprentice: Apprentice | null = null;

  constructor(
    private listeApprentisTuteurService: ListeApprentisTuteurService,
    private toastr: ToastrService,
    private router: Router,
    private createUserService: CreateUserService,
    private apprenticeIdService: ApprenticeIdService
  ) {}

  ngOnInit() {
    this.listeApprentisTuteurService.getListeApprentices().subscribe(
      (response) => {
        this.apprenticeList = response.body;
        this.loading = false;
      },
      (error) => {
        console.error('Erreur lors de la requête', error);
        this.toastr.error('Erreur lors du changement de mot passe', 'Erreur', {
          closeButton: true,
        });
      }
    );
  }

  naviguerVersGrille() {
    if (this.selectedApprentice) {
      let id: number;
      this.createUserService
        .getIdByEmail(this.selectedApprentice.email)
        .subscribe((response) => {
          id = response;
          this.apprenticeIdService.setApprenticeId(id);
          this.router.navigate(['/grille-evaluation', id]);
        });
    } else {
      this.toastr.error('Merci de sélectionner un apprenti', 'Erreur', {
        closeButton: true,
      });
    }
  }
}
