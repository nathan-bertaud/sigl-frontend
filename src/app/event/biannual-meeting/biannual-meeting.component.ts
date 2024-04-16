import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { __core_private_testing_placeholder__ } from '@angular/core/testing';
import { EventService } from '../event.service';
@Component({
  selector: 'app-biannual-meeting',
  templateUrl: './biannual-meeting.component.html',
  styleUrls: ['./biannual-meeting.component.css']
})
export class BiannualMeetingComponent implements OnInit {
  biannualMeetingForm!: FormGroup;

  constructor(private fb: FormBuilder,private toastr: ToastrService, private eventService: EventService) { }

  ngOnInit(): void {
    this.biannualMeetingForm = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      place: ['', Validators.required],
      semestre: ['', Validators.required],
    });
  }

  submitEvent() {
    if (this.biannualMeetingForm.valid) {
      const startDate = this.biannualMeetingForm.get('startDate')?.value;
      const endDate = this.biannualMeetingForm.get('endDate')?.value
      const place = this.biannualMeetingForm.get('place')?.value;
      const semestre = this.biannualMeetingForm.get('semestre')?.value;
      let title = "";
      switch (semestre){
        case 'S5':
          title = 'Entretien S5';
          break;
        case 'S6':
          title = 'Entretien S6';
          break;
        case 'S7':
          title = 'Entretien S7';
          break;
        case 'S8':
          title = 'Entretien S8';
          break;
        case 'S9':
          title = 'Entretien S9';
          break;
        case 'S10':
          title = 'Entretien S10';
          break;
      }

      this.eventService.createBiannualMeeting(startDate,endDate,place,semestre,title).subscribe(
        response => {
          if (response.status === 200) {
            this.biannualMeetingForm.reset();
            this.toastr.success('Event créé avec succès', 'Succès', {closeButton: true})
          }
        },
        error => {
          // Handle error
          console.error('Error creating biannual meeting:', error);
        }
      );
    } else {
      this.toastr.error('Impossible de créer un entretien semestriel', 'Erreur', { closeButton: true});
    }
  }
}
