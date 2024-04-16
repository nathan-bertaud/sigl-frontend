import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { VivaService } from '../viva.service';
import { Apprentice } from 'src/shared/models/Apprentice.model';
import { UserNameFirstNameIdDto } from 'src/shared/models/UserNameFirstNameIdDto.model';
import { Observable, map, startWith } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-edit-viva',
  templateUrl: './edit-viva.component.html',
  styleUrls: ['./edit-viva.component.css']
})
export class EditVivaComponent implements OnInit{
  idViva!:number;
  title!: string;
  startDate!: string;
  endDate!: string;
  semestre!: string;
  place!:string;
  errorMessage!:string;
  controlApprentice= new FormControl();
  apprentices: UserNameFirstNameIdDto[] = [];
  selectedApprentice!:number;
  filteredApprentice!: Observable<UserNameFirstNameIdDto[]>;

  constructor(
    public dialogRef: MatDialogRef<EditVivaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private vivaService: VivaService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {

    this.vivaService.getApprentices().subscribe((data) => {
      this.apprentices = data;
    });

    if(this.data.title){
      this.title=this.data.title;
    }
    if (this.data.startDate) {
      const startDateFormatted = new Date(this.data.startDate).toISOString().slice(0, 16);
      this.startDate = startDateFormatted;
    }
    
    if (this.data.endDate) {
      const endDateFormatted = new Date(this.data.endDate).toISOString().slice(0, 16);
      this.endDate = endDateFormatted;
    }
    if(this.data.semestre){
      this.semestre=this.data.semestre;
    }
    if(this.data.place){
      this.place=this.data.place;
    }
    if(this.data.id){
      this.idViva=this.data.id;
    }
    if (
      this.data.idApprentice &&
      this.data.firstNameApprentice &&
      this.data.nameApprentice
    ) {
      
      if (!this.controlApprentice.value) {
        this.controlApprentice.setValue(new UserNameFirstNameIdDto(this.data.idApprentice,this.data.nameApprentice,this.data.firstNameApprentice)
        );
      }
      this.selectedApprentice = this.data.idApprentice;
    }
    this.filteredApprentice = this.controlApprentice.valueChanges.pipe(
      startWith(''),
      map((value) => this.filterApprentice(value))
    );
  }

  private filterApprentice(value: string): UserNameFirstNameIdDto[] {
    if (typeof value === 'string') {
      const filterName = value.toLowerCase();
      
      // Mettez à jour la propriété des résultats filtrés
      return this.apprentices
        .filter(
          (apprentice) =>
            apprentice.name &&
            apprentice.firstName &&
            (apprentice.name.toLowerCase().includes(filterName) ||
              apprentice.firstName.toLowerCase().includes(filterName))
        );
    }else{return []}
  }

  displayApprentice(apprentice: UserNameFirstNameIdDto): string {
    return apprentice ? `${apprentice.name} ${apprentice.firstName}` : '';
  }
  

  onApprenticeSelected(event: MatAutocompleteSelectedEvent): void {
    this.selectedApprentice = event.option.value.id;
  }
  

  onNoClick(): void {
    this.dialogRef.close();
  }

  onConfirmClick(): void {
    if (this.title && this.startDate && this.endDate && this.semestre &&this.place &&this.selectedApprentice) {
      this.dialogRef.close({
        id:this.idViva,
        title: this.title,
        startDate: this.startDate,
        endDate: this.endDate,
        semestre: this.semestre,
        idApprenti: this.selectedApprentice,
        place: this.place
      });
    } else {
      this.errorMessage='Veuillez remplir tous les champs.';
      this.toastr.error(this.errorMessage, 'Erreur', { closeButton: true })
    }
  }
}

export interface DialogData {
  id:number;
  title: string;
  startDate: string;
  endDate:string;
  semestre:string;
  place:string;
  idApprentice:number;
  nameApprentice:string;
  firstNameApprentice:string;
}
