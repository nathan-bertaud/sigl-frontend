import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Apprentice } from "src/shared/models/Apprentice.model";
import { ApprenticeListing } from "src/shared/models/ApprenticeListing.model";
import { ApprenticeMentor } from "src/shared/models/ApprenticeMentor.model";

@Injectable()
export class AfficherEtudiantService{
    constructor(private http: HttpClient) {}

    private getApprenticesByYear = "api/apprentice/getapprenticesbyyear"
    private getEducationalTutorsApi = "/api/apprentice-tutor/geteducationaltutor";
    private updateEducationalTutorApi = "api/apprentice/updateapprentices"

    getApprentices(currentYear: number): Observable<ApprenticeListing[]> {
        return this.http.post<ApprenticeListing[]>(this.getApprenticesByYear, {currentYear});
    }

    getEducationalTutors(): Observable<ApprenticeMentor[]> {
        return this.http.get<ApprenticeMentor[]>(this.getEducationalTutorsApi);
    }

    updateEducationalTutor(apprentices: any[]):  Observable<string> {
        return this.http.post(this.updateEducationalTutorApi, apprentices, {responseType: 'text'});
    }   
}