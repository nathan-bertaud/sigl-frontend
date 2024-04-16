import { Component, OnInit } from '@angular/core';
import { CreateUserService } from '../create-user/create-user.service';
import { EducationalTutor } from 'src/shared/models/EducationalTutor.model';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { Viva } from 'src/shared/models/Viva.model';
import { ApprenticeMentor } from 'src/shared/models/ApprenticeMentor.model';
import { UserRequest } from 'src/shared/models/UserRequest.model';
import { ToastrService } from 'ngx-toastr';
import { JuryService } from './jury.service';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { UserNameFirstNameDto } from 'src/shared/models/UserNameFirstNameDto.model';

@Component({
  selector: 'app-jury',
  templateUrl: './jury.component.html',
  styleUrls: ['./jury.component.css'],
})
export class JuryComponent implements OnInit {
  controlTutor = new FormControl();
  autoTutor!: MatAutocomplete;
  controlMentor = new FormControl();
  autoMentor!: MatAutocomplete;
  controlApprentice = new FormControl();
  autoApprentice!: MatAutocomplete;
  educationalTutors: EducationalTutor[] = [];
  apprenticeMentors: ApprenticeMentor[] = [];
  filteredTutors!: Observable<EducationalTutor[]>;
  filteredMentor!: Observable<ApprenticeMentor[]>;
  startDate: Date | null = null;
  endDate: Date | null = null;
  juries: UserNameFirstNameDto[] = [];
  soutenance: Viva[] = [];

  constructor(
    private createUserService: CreateUserService,
    private juryService: JuryService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.filteredTutors = this.controlTutor.valueChanges.pipe(
      startWith(''),
      map((value) => this.filterTutors(value))
    );
    this.filteredMentor = this.controlMentor.valueChanges.pipe(
      startWith(''),
      map((value) => this.filterMentor(value))
    );

    this.createUserService.getEducationalTutors().subscribe((data) => {
      this.educationalTutors = data;
    });
    this.createUserService.getApprenticeMentors().subscribe((data) => {
      this.apprenticeMentors = data;
    });
  }

  private filterTutors(value: string): EducationalTutor[] {
    const filterValue = value.toLowerCase();
    return this.educationalTutors
      .filter(
        (educationalTutor) =>
          educationalTutor.name.toLowerCase().includes(filterValue) ||
          educationalTutor.firstName.toLowerCase().includes(filterValue)
      );
  }
  private filterMentor(value: string): ApprenticeMentor[] {
    const filterValue = value.toLowerCase();
    return this.apprenticeMentors
      .filter(
        (apprenticeMentor) =>
          apprenticeMentor.name.toLowerCase().includes(filterValue) ||
          apprenticeMentor.firstName.toLowerCase().includes(filterValue)
      );
  }

  ajouterEducationalTutor() {
    if (
      this.controlTutor.value &&
      this.educationalTutors.some(
        (tutor) =>
          `${tutor.name} ${tutor.firstName}`.toLowerCase() ===
          this.controlTutor.value.toLowerCase()
      )
    ) {
      const tutorFullName = this.controlTutor.value;

    // Diviser la chaîne en nom et prénom
    const [tutorName, tutorFirstName] = tutorFullName.split(' ');
      const tutorObject = new UserNameFirstNameDto(tutorName,tutorFirstName);
      
      this.juries.push(tutorObject);
      this.controlTutor.setValue('');
    } else {
      this.toastr.error("La personne n'est pas un Tuteur", 'error', {
        closeButton: true,
      });
      this.controlTutor.setValue('');
    }
  }
  ajouterMentor() {
    if (
      this.controlMentor.value &&
      this.apprenticeMentors.some(
        (mentor) =>
          `${mentor.name} ${mentor.firstName}`.toLowerCase() ===
          this.controlMentor.value.toLowerCase()
      )
    ) {
      const mentorFullName = this.controlMentor.value;

    // Diviser la chaîne en nom et prénom
    const [mentorName, mentorFirstName] = mentorFullName.split(' ');
      const mentorObject = new UserNameFirstNameDto(mentorName,mentorFirstName);
      
      this.juries.push(mentorObject);
      this.controlMentor.setValue('');
    } else {
      this.toastr.error("La personne n'est pas un Mentor", 'error', {
        closeButton: true,
      });
      this.controlMentor.setValue('');
    }
  }

  removeJury(index: number) {
    this.juries = this.juries.slice(0, index).concat(this.juries.slice(index + 1));
  }

  ajouterJury(){
    if(this.juries.length>=3){
      this.juryService.ajouterJury(this.juries).subscribe(
        response => {
          if (response.status === 200) {
            this.juries.pop();
            this.toastr.success('Jury créé avec succès', 'Succès', {closeButton: true})
          }
        },
        error => {
          // Handle error
          console.error('Error lors de la création d\'un jury:', error);
        }
      );
    }else{
      this.toastr.error("Il faut minimum 3 juré(e)s", 'error', {
        closeButton: true,
      });
    }
  }
}
