import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { Apprentice } from 'src/shared/models/Apprentice.model';
import { BiannualAssesmentRequest } from 'src/shared/models/BiannualAssessmentRequest.model';
import { BiannualAssesmentS10 } from 'src/shared/models/BiannualAssessmentS10.model';
import { BiannualAssesmentS5 } from 'src/shared/models/BiannualAssessmentS5.model';
import { BiannualAssesmentS6 } from 'src/shared/models/BiannualAssessmentS6.model';
import { BiannualAssesmentS7 } from 'src/shared/models/BiannualAssessmentS7.model';
import { BiannualAssesmentS8 } from 'src/shared/models/BiannualAssessmentS8.model';
import { BiannualAssesmentS9 } from 'src/shared/models/BiannualAssessmentS9.model';

@Injectable()
export class GrilleEvaluationService {
  constructor(private http: HttpClient, private formBuilder: FormBuilder) {}

  private urladdGrilleEvaluation = '/api/addBiAnnualAssessment/';
  private urlgetGrilleEvaluationForTutor = '/api/getBiAnnualAssessmentForTutor/';
  private urlgetGrilleEvaluationForApprentice = '/api/getBiAnnualAssessmentForApprentice';
  private urlgetApprentice = '/api/apprentice/getapprenticebyId/';

  enregistrerGrilleEvaluation(
    biannualAssesmentRequest: BiannualAssesmentRequest,
    idApprenti: number
  ): Observable<HttpResponse<any>> {
    return this.http.post<any>(
      this.urladdGrilleEvaluation + idApprenti,
      biannualAssesmentRequest,
      { observe: 'response' }
    );
  }

  recupererGrilleEvaluationForTutor(
    idApprenti: number
  ): Observable<BiannualAssesmentRequest> {
    return this.http.get<BiannualAssesmentRequest>(this.urlgetGrilleEvaluationForTutor + idApprenti)
  }

  recupererGrilleEvaluationForApprentice(): Observable<BiannualAssesmentRequest> {
    return this.http.get<BiannualAssesmentRequest>(this.urlgetGrilleEvaluationForApprentice)
  }

  recupererApprentiById(idApprenti: number): Observable<Apprentice> {
    return this.http.get<Apprentice>(this.urlgetApprentice + idApprenti);
  }
}
