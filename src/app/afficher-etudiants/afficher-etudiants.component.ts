import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApprenticeListing } from 'src/shared/models/ApprenticeListing.model';
import { AfficherEtudiantService } from './afficher-etudiant.service';
import { Observable } from 'rxjs';
import { EducationalTutor } from 'src/shared/models/EducationalTutor.model';
import { UserRequest } from 'src/shared/models/UserRequest.model';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { errorMessages } from 'src/shared/errorMessages';
import { ToastrService } from 'ngx-toastr';
import { Apprentice } from 'src/shared/models/Apprentice.model';

@Component({
  selector: 'app-afficher-etudiants',
  templateUrl: './afficher-etudiants.component.html',
  styleUrls: ['./afficher-etudiants.component.css']
})
export class AfficherEtudiantsComponent {
  promotion: string = 'e5a';
  etudiants: ApprenticeListing[] | undefined
  currentYear: number = 5;
  educationalTutors: EducationalTutor[] | undefined
  modifiedStudents: any[] = [];

  constructor(private route: ActivatedRoute,
    private afficherEtudiantService: AfficherEtudiantService,
    private toastr: ToastrService) {}

  ngOnInit() {
    this.afficherEtudiantService.getEducationalTutors().subscribe(
      data => {
        this.educationalTutors = data;
      });
    
    this.promotion = this.route.snapshot.paramMap.get('promotion')!;
    switch(this.promotion){
      case "E3A":
        this.currentYear = 3;
        break;
      case "E4A":
        this.currentYear = 4;
        break;
      case "E5A":
        this.currentYear = 5;
        break;
    }
    this.afficherEtudiantService.getApprentices(this.currentYear).subscribe(
      data => {
        this.etudiants = data;
      }
    );
  }

  onTutorChange(etudiant: any) {
    const modifiedStudent = JSON.parse(JSON.stringify(etudiant));

    const isAlreadyModified = this.modifiedStudents.some(
      existingStudent => existingStudent === modifiedStudent
    );

    if (!isAlreadyModified) {
      this.modifiedStudents.push(modifiedStudent);
    } else {
      const existingIndex = this.modifiedStudents.findIndex(
        existingStudent => existingStudent.educationalTutor === modifiedStudent.educationalTutor
      );
      if (existingIndex !== -1) {
        this.modifiedStudents[existingIndex] = modifiedStudent;
      }
    }
  }

  onValiderClick() {
    for(const modified in this.modifiedStudents){
      const newTutor = new EducationalTutor(new UserRequest('', '', new Date(''), this.modifiedStudents[modified].educationalTutor.email, '', []), '');
      this.modifiedStudents[modified].educationalTutor = newTutor;
    }
      this.afficherEtudiantService.updateEducationalTutor(this.modifiedStudents).subscribe(
        response => {
          this.toastr.success(errorMessages.apprenticeCreationSuccess, 'Succès', { closeButton: true });
          return;
        },
        (error: HttpErrorResponse) => {
          this.toastr.error(errorMessages.apprenticeCreationFailure, 'Erreur', { closeButton: true });
        }
      );
    this.modifiedStudents = [];
  }
}