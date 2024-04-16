import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Apprentice } from 'src/shared/models/Apprentice.model';
import { ApprenticeMentor } from 'src/shared/models/ApprenticeMentor.model';
import { EducationalTutor } from 'src/shared/models/EducationalTutor.model';

@Injectable()
export class CreateUserService {
  constructor(private http: HttpClient) {}

  private createApprenticeMentorApi =
    'api/apprentice-mentor/addapprenticementor';
  private createEducationalTutorApi =
    'api/apprentice-tutor/addeducationaltutor';
  private createApprenticeApi = 'api/apprentice/add';
  private getApprenticeMentorsApi =
    '/api/apprentice-mentor/getapprenticementors';
  private getEducationalTutorsApi = '/api/apprentice-tutor/geteducationaltutor';
  private getIdByEmailApi = '/api/idByEmail';

    getApprenticeMentors(): Observable<ApprenticeMentor[]> {
        return this.http.get<ApprenticeMentor[]>(this.getApprenticeMentorsApi);
    }
    
    getEducationalTutors(): Observable<EducationalTutor[]> {
    return this.http.get<EducationalTutor[]>(this.getEducationalTutorsApi);
    }

  createMentor(mentor: ApprenticeMentor): Observable<HttpResponse<any>> {
    return this.http.post(this.createApprenticeMentorApi, mentor, {
      observe: 'response',
    });
  }

  createEducationalTutor(
    tutor: EducationalTutor
  ): Observable<HttpResponse<any>> {
    return this.http.post(this.createEducationalTutorApi, tutor, {
      observe: 'response',
    });
  }

  createApprentice(apprentice: Apprentice): Observable<HttpResponse<any>> {
    return this.http.post(this.createApprenticeApi, apprentice, {
      observe: 'response',
    });
  }

  getIdByEmail(email: string): Observable<number> {
    const url = `${this.getIdByEmailApi}?email=${encodeURIComponent(email)}`;
    return this.http.get<number>(url);
  }
}
