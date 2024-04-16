import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EventService } from '../event.service';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.css']
})
export class NewEventComponent {
  newEventForm!: FormGroup;

  constructor(private fb: FormBuilder,private toastr: ToastrService, private eventService: EventService) { }

  submitEvent() {
    if (this.newEventForm.valid) {
      const startDate = this.newEventForm.get('startDate')?.value;
      const endDate = this.newEventForm.get('endDate')?.value
      const title = this.newEventForm.get('title')?.value;
      const semestre = this.newEventForm.get('semestre')?.value;
      this.eventService.createEvent(title,startDate,endDate,semestre).subscribe(
        response => {
          if (response.status === 200) {
              this.newEventForm.reset();
              this.toastr.success('Event créé avec succès', 'Succès', { closeButton: true });
          }
        },
        error => {
          // Handle error
          console.error('Error creating key date:', error);
        }
      );
    } else {
      this.toastr.error('Impossible de créer une date clé', 'Erreur', { closeButton: true});
    }
  }
}
