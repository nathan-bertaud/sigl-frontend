import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MensualNoteService } from './mensual-note.component.service';
import { Title } from '@angular/platform-browser';
import { Note } from 'src/shared/models/Note.model';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-mensual-note',
  templateUrl: './mensual-note.component.html',
  styleUrls: ['./mensual-note.component.css']
})
export class MensualNoteComponent {

  formulaireAddNote: FormGroup;

  existingNotes: Array<Note> = new Array();
  selectedNoteValue: Note = this.existingNotes[0];

  constructor(private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private mensualNoteService: MensualNoteService){
      this.formulaireAddNote = this.formBuilder.group({
        notetitle: ['', Validators.required],
        startDate: ['', Validators.required],
        endDate: ['', Validators.required],
        activitySummary: ['', Validators.required],
      });
      
  }
  ngOnInit() {
    this.existingNotes.push(new Note("Créer une nouvelle note", new Date, new Date,''))
    this.mensualNoteService.getNotes().subscribe(
      (response) => {
        if (response.body) {
          // Ajoute chaque note de la réponse à votre tableau existingNotes
          response.body.forEach((note: Note) => {
            this.existingNotes.push(note);
          });
        }
      }

    )
  }

  ngOnChanges() {
    this.formulaireAddNote = this.formBuilder.group({
      notetitle: [this.selectedNoteValue.title, Validators.required],
      startDate: [this.selectedNoteValue.startDate, Validators.required],
      endDate: [this.selectedNoteValue.endDate, Validators.required],
      activitySummary: [this.selectedNoteValue.resume, Validators.required],
    });
  }

  AddNote(){

    const notetitle = this.formulaireAddNote.get('notetitle')?.value;
    const startDate = this.formulaireAddNote.get('startDate')?.value
    const endDate = this.formulaireAddNote.get('endDate')?.value
    const activitySummary = this.formulaireAddNote.get('activitySummary')?.value

    const note = new Note(notetitle, startDate, endDate, activitySummary)
    if (this.formulaireAddNote.valid) {
      this.mensualNoteService.addNote(note).subscribe();
      this.toastr.success('La note a bien été ajoutée', 'Succès', {closeButton: true});
      }
    }
    
    onNoteSelect(event: any) {
      const selectedNoteValue = event.target.value;
    
      if (selectedNoteValue === 'newNote') {

        this.formulaireAddNote.reset();
        this.selectedNoteValue = new Note("Créer une nouvelle note", new Date(), new Date(), '');
      } else {
        const selectedNoteIndex = event.target.selectedIndex;
        this.selectedNoteValue = this.existingNotes[selectedNoteIndex];
    
        this.formulaireAddNote.patchValue({
          notetitle: this.selectedNoteValue.title,
          startDate: this.selectedNoteValue.startDate,
          endDate: this.selectedNoteValue.endDate,
          activitySummary: this.selectedNoteValue.resume,
        });
    
        const formattedStartDate = formatDate(this.selectedNoteValue.startDate, 'yyyy-MM-dd', 'en-US');
        const formattedEndDate = formatDate(this.selectedNoteValue.endDate, 'yyyy-MM-dd', 'en-US');
    
        this.formulaireAddNote.get('startDate')?.setValue(formattedStartDate);
        this.formulaireAddNote.get('endDate')?.setValue(formattedEndDate);
      }
    }
    
}
