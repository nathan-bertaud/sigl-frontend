import { HttpClient, HttpResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { AddDocumentService } from './add-document.service';
import { ToastrService } from 'ngx-toastr';
import { errorMessages } from 'src/shared/errorMessages';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.component.html',
  styleUrls: ['./add-document.component.css'],
})

export class AddDocumentComponent {
  
  selectedFile: File | null = null;
  fileName: string = '';
  comment: string = '';
  status: string = 'brouillon'; 
  selectedDocument: string = 'Document1';
  selectedChoice: string = 'Defaut';
  choices: string[] = ['S05-Fiche de Synthèse', 'S06-Fiche de Synthèse', 'S08-Fiche de Synthèse', 'S09-Fiche de Synthèse', 'S10-Fiche de Synthèse'];
  keyword1: string = '';
  keyword2: string = '';
  keyword3: string = '';
  keyword4: string = '';

  constructor(private http: HttpClient,private addDocumentService: AddDocumentService,
    private toastr: ToastrService) {
    
  }
  

onDocumentChange() {
  // Mettez à jour la liste des choix en fonction du document sélectionné
  if (this.selectedDocument === 'Document1') { // Fiche de synthèse 
    this.choices = ['S05-Fiche de Synthèse', 'S06-Fiche de Synthèse', 'S08-Fiche de Synthèse', 'S09-Fiche de Synthèse', 'S10-Fiche de Synthèse'];
  } else if (this.selectedDocument === 'Document2') {// Rapport 
    this.choices = ['S06-Rapport de conduite de projet', 'S07-Rapport de synthèse', 'S08-Rapport de projet PING', 'S10-Rapport projet PING'];
  }
  else if (this.selectedDocument === 'Document3') {// Plan de Rapport 
    this.choices = ['S10-Plan de rapport détaillé'];
  // Ajoutez des conditions pour d'autres documents si nécessaire
  }
  else if (this.selectedDocument === 'Document4') {// Support 
    this.choices = ['S07-Support de soutenance','S08-Support de soutenance'];
  // Ajoutez des conditions pour d'autres documents si nécessaire
  }
  else if (this.selectedDocument === 'Document5') {// Autre
    this.choices = ['S05-Autre document','S06-Autre document','S07-Autre document','S08-Autre document','S09-Autre document','S10-Autre document'];
  // Ajoutez des conditions pour d'autres documents si nécessaire
  }
}
  //Recupere le document
  onFileSelected(event: any): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
     
    }
  }

  uploadDocument(): void {
    this.toastr.info('Upload en cours', 'Informations', { closeButton: true });

    if (this.selectedFile) {
      const fileName = this.selectedFile.name;
      const comment = this.comment;
      const status = this.status;
      const docType = this.selectedDocument;
      const selectedChoice = this.selectedChoice;
      
      const keyword1 = this.keyword1;
      const keyword2 = this.keyword2;
      const keyword3 = this.keyword3;
      const keyword4 = this.keyword4;

      // Envoyer la requête POST avec HttpClient
      this.addDocumentService
        .uploadDocument(this.selectedFile, fileName, comment, status,selectedChoice,docType,keyword1,keyword2,keyword3,keyword4)
        .subscribe(
          (response: HttpResponse<any>) => {
            const responseBody = response.body;         
          },
          (error) => {
            if (error.status == 409) {
              this.toastr.error(errorMessages.documentUploadFailure, 'Erreur', { closeButton: true });
              // reset des champs 
            } 
            else if (error.status==400){
              this.toastr.error(errorMessages.documentUploadBadRequest, 'Erreur', { closeButton: true });
            }
            else if (error.status==200){
              this.toastr.success(errorMessages.documentUploadSuccess, 'Succès', { closeButton: true });
            }
            else{
              this.toastr.error('Seul le format PDF est autorisé, taille maximale : 10Mo', 'Erreur', { closeButton: true });
            }
          },                           
        );
         
    } 
  } 
}
