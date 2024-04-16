import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { DocumentResponseDTO } from './DocumentResponse.dto';
@Injectable()
export class DocumentService {
  private baseUrl = '/api/getDocument'; // Replace with your actual backend API base URL
  private deleteUrl= '/api/deleteFile'
  private downloadUrl ='/api/downloadFile'
  constructor(private http: HttpClient) {}
 
  getAllDocuments(options?: any): Observable<DocumentResponseDTO[]> {
    return this.http.get<DocumentResponseDTO[]>(this.baseUrl);
  }
  deleteFile(id: number): Observable<any> {
    // Send 'id' as a query parameter
    const params = new HttpParams().set('id', id.toString());
    return this.http.post(this.deleteUrl, null, { params: params });
  }
 
  downloadFile(fileName: string): Observable<any> {
    const params = new HttpParams().set('fileName',fileName );
    return this.http.get(this.downloadUrl, { params, observe: 'response', responseType: 'arraybuffer' })
    .pipe(
      map((response: HttpResponse<ArrayBuffer>) => {
        if (!response.body) {
          // Handle null response, you might want to throw an error or handle it in some way
          console.error('Null response body');
          return response;
        }

        // Create a Blob from the array buffer
        const blob = new Blob([response.body], { type: 'application/pdf' });

        // Create a link element to trigger the download
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = fileName; // Set the desired file name
        link.click();

        // Clean up
        window.URL.revokeObjectURL(link.href);

        return response;
      })
    );
  }
}