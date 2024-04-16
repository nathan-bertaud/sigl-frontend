import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Note } from "src/shared/models/Note.model";

@Injectable()
export class MensualNoteService {

    constructor(private http: HttpClient) {}

    private urlAddNote = '/api/addnote'; 
    private urlGetNote = '/api/note/get';

    addNote(note : Note): Observable<HttpResponse<any>> {
        return this.http.post(this.urlAddNote, note, { observe: 'response' });
    }

    getNotes(): Observable<HttpResponse<any>> {
        return this.http.get(this.urlGetNote, {
            observe: 'response'
        });
      }


}