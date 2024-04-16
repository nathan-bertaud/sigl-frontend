import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable()
 
export class AddDocumentService {

  constructor(private http: HttpClient) { }

  private urlCompteEntreprise = '/api/testUpload';
  uploadDocument(file: File, fileName: string, comment: string, status: string, selectedChoice: string,docType: string,keyword1: string
    ,keyword2: string,keyword3: string,keyword4: string): Observable<any> {
      
      const fileExtension = file.name?.split('.').pop()?.toLowerCase();
     
      if (!fileExtension || fileExtension !== 'pdf') {
        // Handle invalid file type (e.g., show an error message)
        return throwError('Invalid file type. Only PDF files are allowed.');
      }
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', fileName);
    formData.append('comment', comment);
    formData.append('status', status); // validé déposé ...
    formData.append('selectedChoice',selectedChoice); // S05-Fiche de synthèse etc...
    formData.append('docType',docType),// Fiche de synthèse rapport etc..
    formData.append('keyword1',keyword1),
    formData.append('keyword2',keyword2),
    formData.append('keyword3',keyword3),
    formData.append('keyword4',keyword4)
    
  
    return this.http.post(this.urlCompteEntreprise, formData);
  
    
  }
}