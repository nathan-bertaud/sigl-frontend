import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Component } from '@angular/core';
import { CreateUserService } from './create-user.service';
import { Apprentice } from 'src/shared/models/Apprentice.model';
import { UserRequest } from 'src/shared/models/UserRequest.model';
import { ApprenticeMentor } from 'src/shared/models/ApprenticeMentor.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { EducationalTutor } from 'src/shared/models/EducationalTutor.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { errorMessages } from 'src/shared/errorMessages';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent {
  maxDate: Date = new Date('2006-12-31T23:59:59');
  minDate: Date = new Date('1935-12-31T23:59:59');
  formData = {
    selectedRole: '',
    firstName: '',
    lastName: '',
    studyYear: 0,
    majorOption: '',
    minorOption: '',
    enterprise: '',
    specialization: '',
    educationalTutor: '',
    birthdate: '',
    email: '',
    password: '',
  };
  hasBeenCalled: boolean = false;
  selectedMentor: ApprenticeMentor = new ApprenticeMentor(
    new UserRequest('', '', new Date('11/11/1111'), '', '', []),
    '',
    ''
  );
  selectedTutor: EducationalTutor = new EducationalTutor(
    new UserRequest('', '', new Date('11/11/1111'), '', '', []),
    ''
  );
  apprenticeMentors: ApprenticeMentor[] = [];
  educationalTutors: EducationalTutor[] = [];

  constructor(
    private http: HttpClient,
    private createUserService: CreateUserService,
    private toastr: ToastrService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  getAllApprenticeMentors() {
    this.createUserService.getApprenticeMentors().subscribe((data) => {
      this.apprenticeMentors = data;
    });
    this.createUserService.getEducationalTutors().subscribe((data) => {
      this.educationalTutors = data;
    });
  }
  ngDoCheck() {
    if (
      this.formData.selectedRole === 'apprenti' &&
      this.hasBeenCalled === false
    ) {
      this.hasBeenCalled = true;
      this.getAllApprenticeMentors();
    }
  }

  ngOnInit() {}

  submitForm() {
    const newUser = new UserRequest(
      this.formData.lastName,
      this.formData.firstName,
      new Date(this.formData.birthdate),
      this.formData.email,
      this.formData.password,
      []
    );
    switch (this.formData.selectedRole) {
      case 'apprenti':
        let idMentor = -1;
        let idTutor = -1;
        forkJoin([
          this.createUserService.getIdByEmail(this.selectedMentor.email),
          this.createUserService.getIdByEmail(this.selectedTutor.email),
        ]).subscribe(
          ([mentorId, tutorId]) => {
            idMentor = mentorId;
            idTutor = tutorId;
            const newApprentice = new Apprentice(
              newUser,
              this.formData.studyYear,
              this.formData.majorOption,
              this.formData.minorOption,
              { id: idMentor },
              { id: idTutor },
              [],
              []
            );
            this.createUserService.createApprentice(newApprentice).subscribe(
              (response: HttpResponse<any>) => {
                if (response.status === 200) {
                  this.toastr.success(
                    errorMessages.apprenticeCreationSuccess,
                    'Succès',
                    { closeButton: true }
                  );
                  this.router.navigate(['/home']);
                  return;
                } else if (response.status === 404) {
                  this.toastr.error(
                    errorMessages.apprenticeCreationFailure,
                    'Erreur',
                    { closeButton: true }
                  );
                }
              },
              (error: HttpErrorResponse) => {
                this.toastr.error(
                  errorMessages.apprenticeCreationFailure,
                  'Erreur',
                  { closeButton: true }
                );
              }
            );
          },
          (error) => {
            console.error('Error fetching user IDs:', error);
            this.toastr.error(errorMessages.erreurHTTP, 'Erreur', {
              closeButton: true,
            });
          }
        );
        break;
      case 'tuteur':
        const newTutor = new EducationalTutor(
          newUser,
          this.formData.specialization
        );
        this.createUserService.createEducationalTutor(newTutor).subscribe(
          (response: HttpResponse<any>) => {
            if (response.status === 200) {
              this.toastr.success(
                errorMessages.apprenticeTutorSuccess,
                'Succès',
                { closeButton: true }
              );
              this.router.navigate(['/home']);
            } else if (response.status === 404) {
              this.toastr.error(
                errorMessages.apprenticeTutorFailure,
                'Erreur',
                { closeButton: true }
              );
            }
          },
          (error: HttpErrorResponse) => {
            this.toastr.error(errorMessages.apprenticeTutorFailure, 'Erreur', {
              closeButton: true,
            });
          }
        );
        break;
      case 'maitre':
        const newMentor = new ApprenticeMentor(
          newUser,
          this.formData.enterprise,
          this.formData.specialization
        );
        this.createUserService.createMentor(newMentor).subscribe(
          (response: HttpResponse<any>) => {
            if (response.status === 200) {
              this.toastr.success(
                errorMessages.apprenticeMentorSucces,
                'Succès',
                { closeButton: true }
              );
              this.router.navigate(['/home']);
            } else if (response.status === 404) {
              this.toastr.error(
                errorMessages.apprenticeMentorFailure,
                'Erreur',
                { closeButton: true }
              );
            }
          },
          (error: HttpErrorResponse) => {
            this.toastr.error(errorMessages.apprenticeMentorFailure, 'Erreur', {
              closeButton: true,
            });
          }
        );
        break;
    }
  }
}
