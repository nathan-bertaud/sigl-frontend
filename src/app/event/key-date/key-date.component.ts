import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EventService } from '../event.service';

@Component({
  selector: 'app-keydate',
  templateUrl: './key-date.component.html',
  styleUrls: ['./key-date.component.css']
})
export class KeydateComponent {
  keyDateForm!: FormGroup;

  constructor(private fb: FormBuilder,private toastr: ToastrService, private keyDateService: EventService) { }

  ngOnInit(): void {
    this.keyDateForm = this.fb.group({
      title: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      semestre: ['', Validators.required],
    });
  }

  submitEvent() {
    if (this.keyDateForm.valid) {
      const dateDebut = this.keyDateForm.get('startDate')?.value;
      const dateFin = this.keyDateForm.get('endDate')?.value
      const title = this.keyDateForm.get('title')?.value;
      const semestre = this.keyDateForm.get('semestre')?.value;
      this.keyDateService.createEvent(title,dateDebut,dateFin,semestre).subscribe(
        response => {
          if (response.status === 200) {
              this.keyDateForm.reset();
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
