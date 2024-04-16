import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthentificationService } from '../authentification/authentification.service';
import { ToastrService } from 'ngx-toastr';
import { GrilleEvaluationService } from './grille-evaluation.service';
import { BiannualAssesmentS5 } from 'src/shared/models/BiannualAssessmentS5.model';
import { BiannualAssesmentS6 } from 'src/shared/models/BiannualAssessmentS6.model';
import { BiannualAssesmentS7 } from 'src/shared/models/BiannualAssessmentS7.model';
import { BiannualAssesmentS8 } from 'src/shared/models/BiannualAssessmentS8.model';
import { BiannualAssesmentS9 } from 'src/shared/models/BiannualAssessmentS9.model';
import { BiannualAssesmentS10 } from 'src/shared/models/BiannualAssessmentS10.model';
import { BiannualAssesmentRequest } from 'src/shared/models/BiannualAssessmentRequest.model';
import { ApprenticeIdService } from 'src/shared/services/ApprenticeId.service';
import { Apprentice } from 'src/shared/models/Apprentice.model';
import { UserRequest } from 'src/shared/models/UserRequest.model';
import { errorMessages } from 'src/shared/errorMessages';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-grille-evaluation',
  templateUrl: './grille-evaluation.component.html',
  styleUrls: ['./grille-evaluation.component.css'],
})
export class GrilleEvaluationComponent {
  diagnosisValues: {
    value: number | undefined;
    comment: string | undefined;
  }[] = [];
  apprenticeId: number = 0;
  private initializeDiagnosisValues(start: number, end: number): void {
    for (let i = start; i <= end; i++) {
      this.diagnosisValues.push({ value: undefined, comment: undefined });
    }
  }

  concevoirValues: {
    value: number | undefined;
    comment: string | undefined;
  }[] = [];
  private initializeConcevoirValues(start: number, end: number): void {
    for (let i = start; i <= end; i++) {
      this.concevoirValues.push({ value: undefined, comment: undefined });
    }
  }

  produireValues: { value: number | undefined; comment: string | undefined }[] =
    [];
  private initializeProduireValues(start: number, end: number): void {
    for (let i = start; i <= end; i++) {
      this.produireValues.push({ value: undefined, comment: undefined });
    }
  }

  validerValues: { value: number | undefined; comment: string | undefined }[] =
    [];
  private initializeValiderValues(start: number, end: number): void {
    for (let i = start; i <= end; i++) {
      this.validerValues.push({ value: undefined, comment: undefined });
    }
  }

  piloterValues: { value: number | undefined; comment: string | undefined }[] =
    [];
  private initializePiloterValues(start: number, end: number): void {
    for (let i = start; i <= end; i++) {
      this.piloterValues.push({ value: undefined, comment: undefined });
    }
  }

  adapterValues: { value: number | undefined; comment: string | undefined }[] =
    [];
  private initializeAdapterValues(start: number, end: number): void {
    for (let i = start; i <= end; i++) {
      this.adapterValues.push({ value: undefined, comment: undefined });
    }
  }

  communiquerValues: {
    value: number | undefined;
    comment: string | undefined;
  }[] = [];
  private initializeCommuniquerValues(start: number, end: number): void {
    for (let i = start; i <= end; i++) {
      this.communiquerValues.push({ value: undefined, comment: undefined });
    }
  }

  communicationValues: {
    semestre: number;
    comment1: string;
    comment2: string;
  }[] = [];

  roles: any;

  constructor(
    private route: ActivatedRoute,
    private authentificationService: AuthentificationService,
    private toastr: ToastrService,
    private grilleEvaluationService: GrilleEvaluationService,
    private apprenticeIdService: ApprenticeIdService
  ) {
    this.roles = this.authentificationService.getRoles();
    this.initializeDiagnosisValues(5, 10);
    this.initializeConcevoirValues(5, 10);
    this.initializeProduireValues(5, 10);
    this.initializeValiderValues(5, 10);
    this.initializePiloterValues(5, 10);
    this.initializeAdapterValues(5, 10);
    this.initializeCommuniquerValues(5, 10);

    for (let i = 5; i <= 10; i++) {
      this.communicationValues.push({
        semestre: i,
        comment1: '',
        comment2: '',
      });
    }
  }

  evaluationId: string = '';

  ngOnInit(): void {
    if (this.roles.includes('ROLE_APPRENTI')) {
      this.toastr.info(
        'Cette grille est disponible seulement en lecture pour vous.',
        'INFORMATION',
        { closeButton: true }
      );
    }

    this.apprenticeIdService.apprenticeId$.subscribe((id) => {
      if (id !== null && id !== undefined) {
        this.apprenticeId = id;
      }
    });

    if (this.roles.includes('ROLE_APPRENTI')) {
      this.grilleEvaluationService
        .recupererGrilleEvaluationForApprentice()
        .subscribe((data) => {
          this.diagnosisValues[0].value = data.biannualAssessmentS5.valueDiag;
          this.diagnosisValues[0].comment = data.biannualAssessmentS5.commDiag;

          this.diagnosisValues[1].value = data.biannualAssessmentS6.valueDiag;
          this.diagnosisValues[1].comment = data.biannualAssessmentS6.commDiag;

          this.diagnosisValues[2].value = data.biannualAssessmentS7.valueDiag;
          this.diagnosisValues[2].comment = data.biannualAssessmentS7.commDiag;

          this.diagnosisValues[3].value = data.biannualAssessmentS8.valueDiag;
          this.diagnosisValues[3].comment = data.biannualAssessmentS8.commDiag;

          this.diagnosisValues[4].value = data.biannualAssessmentS9.valueDiag;
          this.diagnosisValues[4].comment = data.biannualAssessmentS9.commDiag;

          this.diagnosisValues[5].value = data.biannualAssessmentS10.valueDiag;
          this.diagnosisValues[5].comment = data.biannualAssessmentS10.commDiag;

          this.concevoirValues[0].value =
            data.biannualAssessmentS5.valueConcevoir;
          this.concevoirValues[0].comment =
            data.biannualAssessmentS5.commConcevoir;

          this.concevoirValues[1].value =
            data.biannualAssessmentS6.valueConcevoir;
          this.concevoirValues[1].comment =
            data.biannualAssessmentS6.commConcevoir;

          this.concevoirValues[2].value =
            data.biannualAssessmentS7.valueConcevoir;
          this.concevoirValues[2].comment =
            data.biannualAssessmentS7.commConcevoir;

          this.concevoirValues[3].value =
            data.biannualAssessmentS8.valueConcevoir;
          this.concevoirValues[3].comment =
            data.biannualAssessmentS8.commConcevoir;

          this.concevoirValues[4].value =
            data.biannualAssessmentS9.valueConcevoir;
          this.concevoirValues[4].comment =
            data.biannualAssessmentS9.commConcevoir;

          this.concevoirValues[5].value =
            data.biannualAssessmentS10.valueConcevoir;
          this.concevoirValues[5].comment =
            data.biannualAssessmentS10.commConcevoir;

          this.produireValues[0].value =
            data.biannualAssessmentS5.valueProduire;
          this.produireValues[0].comment =
            data.biannualAssessmentS5.commProduire;

          this.produireValues[1].value =
            data.biannualAssessmentS6.valueProduire;
          this.produireValues[1].comment =
            data.biannualAssessmentS6.commProduire;

          this.produireValues[2].value =
            data.biannualAssessmentS7.valueProduire;
          this.produireValues[2].comment =
            data.biannualAssessmentS7.commProduire;

          this.produireValues[3].value =
            data.biannualAssessmentS8.valueProduire;
          this.produireValues[3].comment =
            data.biannualAssessmentS8.commProduire;

          this.produireValues[4].value =
            data.biannualAssessmentS9.valueProduire;
          this.produireValues[4].comment =
            data.biannualAssessmentS9.commProduire;

          this.produireValues[5].value =
            data.biannualAssessmentS10.valueProduire;
          this.produireValues[5].comment =
            data.biannualAssessmentS10.commProduire;

          this.validerValues[0].value = data.biannualAssessmentS5.valueValider;
          this.validerValues[0].comment = data.biannualAssessmentS5.commValider;

          this.validerValues[1].value = data.biannualAssessmentS6.valueValider;
          this.validerValues[1].comment = data.biannualAssessmentS6.commValider;

          this.validerValues[2].value = data.biannualAssessmentS7.valueValider;
          this.validerValues[2].comment = data.biannualAssessmentS7.commValider;

          this.validerValues[3].value = data.biannualAssessmentS8.valueValider;
          this.validerValues[3].comment = data.biannualAssessmentS8.commValider;

          this.validerValues[4].value = data.biannualAssessmentS9.valueValider;
          this.validerValues[4].comment = data.biannualAssessmentS9.commValider;

          this.validerValues[5].value = data.biannualAssessmentS10.valueValider;
          this.validerValues[5].comment =
            data.biannualAssessmentS10.commValider;

          this.piloterValues[0].value = data.biannualAssessmentS5.valuePiloter;
          this.piloterValues[0].comment = data.biannualAssessmentS5.commPiloter;

          this.piloterValues[1].value = data.biannualAssessmentS6.valuePiloter;
          this.piloterValues[1].comment = data.biannualAssessmentS6.commPiloter;

          this.piloterValues[2].value = data.biannualAssessmentS7.valuePiloter;
          this.piloterValues[2].comment = data.biannualAssessmentS7.commPiloter;

          this.piloterValues[3].value = data.biannualAssessmentS8.valuePiloter;
          this.piloterValues[3].comment = data.biannualAssessmentS8.commPiloter;

          this.piloterValues[4].value = data.biannualAssessmentS9.valuePiloter;
          this.piloterValues[4].comment = data.biannualAssessmentS9.commPiloter;

          this.piloterValues[5].value = data.biannualAssessmentS10.valuePiloter;
          this.piloterValues[5].comment =
            data.biannualAssessmentS10.commPiloter;

          this.adapterValues[0].value = data.biannualAssessmentS5.valueAdapter;
          this.adapterValues[0].comment = data.biannualAssessmentS5.commAdapter;

          this.adapterValues[1].value = data.biannualAssessmentS6.valueAdapter;
          this.adapterValues[1].comment = data.biannualAssessmentS6.commAdapter;

          this.adapterValues[2].value = data.biannualAssessmentS7.valueAdapter;
          this.adapterValues[2].comment = data.biannualAssessmentS7.commAdapter;

          this.adapterValues[3].value = data.biannualAssessmentS8.valueAdapter;
          this.adapterValues[3].comment = data.biannualAssessmentS8.commAdapter;

          this.adapterValues[4].value = data.biannualAssessmentS9.valueAdapter;
          this.adapterValues[4].comment = data.biannualAssessmentS9.commAdapter;

          this.adapterValues[5].value = data.biannualAssessmentS10.valueAdapter;
          this.adapterValues[5].comment =
            data.biannualAssessmentS10.commAdapter;

          this.communiquerValues[0].value =
            data.biannualAssessmentS5.valueCommuniquer;
          this.communiquerValues[0].comment =
            data.biannualAssessmentS5.commCommuniquer;

          this.communiquerValues[1].value =
            data.biannualAssessmentS6.valueCommuniquer;
          this.communiquerValues[1].comment =
            data.biannualAssessmentS6.commCommuniquer;

          this.communiquerValues[2].value =
            data.biannualAssessmentS7.valueCommuniquer;
          this.communiquerValues[2].comment =
            data.biannualAssessmentS7.commCommuniquer;

          this.communiquerValues[3].value =
            data.biannualAssessmentS8.valueCommuniquer;
          this.communiquerValues[3].comment =
            data.biannualAssessmentS8.commCommuniquer;

          this.communiquerValues[4].value =
            data.biannualAssessmentS9.valueCommuniquer;
          this.communiquerValues[4].comment =
            data.biannualAssessmentS9.commCommuniquer;

          this.communiquerValues[5].value =
            data.biannualAssessmentS10.valueCommuniquer;
          this.communiquerValues[5].comment =
            data.biannualAssessmentS10.commCommuniquer;

          this.communicationValues[0].comment1 =
            data.biannualAssessmentS5.comMA || '';

          this.communicationValues[1].comment1 =
            data.biannualAssessmentS6.comMA || '';

          this.communicationValues[2].comment1 =
            data.biannualAssessmentS7.comMA || '';

          this.communicationValues[3].comment1 =
            data.biannualAssessmentS8.comMA || '';

          this.communicationValues[4].comment1 =
            data.biannualAssessmentS9.comMA || '';

          this.communicationValues[5].comment1 =
            data.biannualAssessmentS10.comMA || '';

          this.communicationValues[0].comment2 =
            data.biannualAssessmentS5.comTutor || '';

          this.communicationValues[1].comment2 =
            data.biannualAssessmentS6.comTutor || '';

          this.communicationValues[2].comment2 =
            data.biannualAssessmentS7.comTutor || '';

          this.communicationValues[3].comment2 =
            data.biannualAssessmentS8.comTutor || '';

          this.communicationValues[4].comment2 =
            data.biannualAssessmentS9.comTutor || '';

          this.communicationValues[5].comment2 =
            data.biannualAssessmentS10.comTutor || '';
        });
    } else if (this.roles.includes('ROLE_TUTOR')) {
      this.grilleEvaluationService
        .recupererGrilleEvaluationForTutor(this.apprenticeId)
        .subscribe((data) => {
          this.diagnosisValues[0].value = data.biannualAssessmentS5.valueDiag;
          this.diagnosisValues[0].comment = data.biannualAssessmentS5.commDiag;

          this.diagnosisValues[1].value = data.biannualAssessmentS6.valueDiag;
          this.diagnosisValues[1].comment = data.biannualAssessmentS6.commDiag;

          this.diagnosisValues[2].value = data.biannualAssessmentS7.valueDiag;
          this.diagnosisValues[2].comment = data.biannualAssessmentS7.commDiag;

          this.diagnosisValues[3].value = data.biannualAssessmentS8.valueDiag;
          this.diagnosisValues[3].comment = data.biannualAssessmentS8.commDiag;

          this.diagnosisValues[4].value = data.biannualAssessmentS9.valueDiag;
          this.diagnosisValues[4].comment = data.biannualAssessmentS9.commDiag;

          this.diagnosisValues[5].value = data.biannualAssessmentS10.valueDiag;
          this.diagnosisValues[5].comment = data.biannualAssessmentS10.commDiag;

          this.concevoirValues[0].value =
            data.biannualAssessmentS5.valueConcevoir;
          this.concevoirValues[0].comment =
            data.biannualAssessmentS5.commConcevoir;

          this.concevoirValues[1].value =
            data.biannualAssessmentS6.valueConcevoir;
          this.concevoirValues[1].comment =
            data.biannualAssessmentS6.commConcevoir;

          this.concevoirValues[2].value =
            data.biannualAssessmentS7.valueConcevoir;
          this.concevoirValues[2].comment =
            data.biannualAssessmentS7.commConcevoir;

          this.concevoirValues[3].value =
            data.biannualAssessmentS8.valueConcevoir;
          this.concevoirValues[3].comment =
            data.biannualAssessmentS8.commConcevoir;

          this.concevoirValues[4].value =
            data.biannualAssessmentS9.valueConcevoir;
          this.concevoirValues[4].comment =
            data.biannualAssessmentS9.commConcevoir;

          this.concevoirValues[5].value =
            data.biannualAssessmentS10.valueConcevoir;
          this.concevoirValues[5].comment =
            data.biannualAssessmentS10.commConcevoir;

          this.produireValues[0].value =
            data.biannualAssessmentS5.valueProduire;
          this.produireValues[0].comment =
            data.biannualAssessmentS5.commProduire;

          this.produireValues[1].value =
            data.biannualAssessmentS6.valueProduire;
          this.produireValues[1].comment =
            data.biannualAssessmentS6.commProduire;

          this.produireValues[2].value =
            data.biannualAssessmentS7.valueProduire;
          this.produireValues[2].comment =
            data.biannualAssessmentS7.commProduire;

          this.produireValues[3].value =
            data.biannualAssessmentS8.valueProduire;
          this.produireValues[3].comment =
            data.biannualAssessmentS8.commProduire;

          this.produireValues[4].value =
            data.biannualAssessmentS9.valueProduire;
          this.produireValues[4].comment =
            data.biannualAssessmentS9.commProduire;

          this.produireValues[5].value =
            data.biannualAssessmentS10.valueProduire;
          this.produireValues[5].comment =
            data.biannualAssessmentS10.commProduire;

          this.validerValues[0].value = data.biannualAssessmentS5.valueValider;
          this.validerValues[0].comment = data.biannualAssessmentS5.commValider;

          this.validerValues[1].value = data.biannualAssessmentS6.valueValider;
          this.validerValues[1].comment = data.biannualAssessmentS6.commValider;

          this.validerValues[2].value = data.biannualAssessmentS7.valueValider;
          this.validerValues[2].comment = data.biannualAssessmentS7.commValider;

          this.validerValues[3].value = data.biannualAssessmentS8.valueValider;
          this.validerValues[3].comment = data.biannualAssessmentS8.commValider;

          this.validerValues[4].value = data.biannualAssessmentS9.valueValider;
          this.validerValues[4].comment = data.biannualAssessmentS9.commValider;

          this.validerValues[5].value = data.biannualAssessmentS10.valueValider;
          this.validerValues[5].comment =
            data.biannualAssessmentS10.commValider;

          this.piloterValues[0].value = data.biannualAssessmentS5.valuePiloter;
          this.piloterValues[0].comment = data.biannualAssessmentS5.commPiloter;

          this.piloterValues[1].value = data.biannualAssessmentS6.valuePiloter;
          this.piloterValues[1].comment = data.biannualAssessmentS6.commPiloter;

          this.piloterValues[2].value = data.biannualAssessmentS7.valuePiloter;
          this.piloterValues[2].comment = data.biannualAssessmentS7.commPiloter;

          this.piloterValues[3].value = data.biannualAssessmentS8.valuePiloter;
          this.piloterValues[3].comment = data.biannualAssessmentS8.commPiloter;

          this.piloterValues[4].value = data.biannualAssessmentS9.valuePiloter;
          this.piloterValues[4].comment = data.biannualAssessmentS9.commPiloter;

          this.piloterValues[5].value = data.biannualAssessmentS10.valuePiloter;
          this.piloterValues[5].comment =
            data.biannualAssessmentS10.commPiloter;

          this.adapterValues[0].value = data.biannualAssessmentS5.valueAdapter;
          this.adapterValues[0].comment = data.biannualAssessmentS5.commAdapter;

          this.adapterValues[1].value = data.biannualAssessmentS6.valueAdapter;
          this.adapterValues[1].comment = data.biannualAssessmentS6.commAdapter;

          this.adapterValues[2].value = data.biannualAssessmentS7.valueAdapter;
          this.adapterValues[2].comment = data.biannualAssessmentS7.commAdapter;

          this.adapterValues[3].value = data.biannualAssessmentS8.valueAdapter;
          this.adapterValues[3].comment = data.biannualAssessmentS8.commAdapter;

          this.adapterValues[4].value = data.biannualAssessmentS9.valueAdapter;
          this.adapterValues[4].comment = data.biannualAssessmentS9.commAdapter;

          this.adapterValues[5].value = data.biannualAssessmentS10.valueAdapter;
          this.adapterValues[5].comment =
            data.biannualAssessmentS10.commAdapter;

          this.communiquerValues[0].value =
            data.biannualAssessmentS5.valueCommuniquer;
          this.communiquerValues[0].comment =
            data.biannualAssessmentS5.commCommuniquer;

          this.communiquerValues[1].value =
            data.biannualAssessmentS6.valueCommuniquer;
          this.communiquerValues[1].comment =
            data.biannualAssessmentS6.commCommuniquer;

          this.communiquerValues[2].value =
            data.biannualAssessmentS7.valueCommuniquer;
          this.communiquerValues[2].comment =
            data.biannualAssessmentS7.commCommuniquer;

          this.communiquerValues[3].value =
            data.biannualAssessmentS8.valueCommuniquer;
          this.communiquerValues[3].comment =
            data.biannualAssessmentS8.commCommuniquer;

          this.communiquerValues[4].value =
            data.biannualAssessmentS9.valueCommuniquer;
          this.communiquerValues[4].comment =
            data.biannualAssessmentS9.commCommuniquer;

          this.communiquerValues[5].value =
            data.biannualAssessmentS10.valueCommuniquer;
          this.communiquerValues[5].comment =
            data.biannualAssessmentS10.commCommuniquer;

          this.communicationValues[0].comment1 =
            data.biannualAssessmentS5.comMA || '';

          this.communicationValues[1].comment1 =
            data.biannualAssessmentS6.comMA || '';

          this.communicationValues[2].comment1 =
            data.biannualAssessmentS7.comMA || '';

          this.communicationValues[3].comment1 =
            data.biannualAssessmentS8.comMA || '';

          this.communicationValues[4].comment1 =
            data.biannualAssessmentS9.comMA || '';

          this.communicationValues[5].comment1 =
            data.biannualAssessmentS10.comMA || '';

          this.communicationValues[0].comment2 =
            data.biannualAssessmentS5.comTutor || '';

          this.communicationValues[1].comment2 =
            data.biannualAssessmentS6.comTutor || '';

          this.communicationValues[2].comment2 =
            data.biannualAssessmentS7.comTutor || '';

          this.communicationValues[3].comment2 =
            data.biannualAssessmentS8.comTutor || '';

          this.communicationValues[4].comment2 =
            data.biannualAssessmentS9.comTutor || '';

          this.communicationValues[5].comment2 =
            data.biannualAssessmentS10.comTutor || '';
        });
    }
  }

  enregistrerGrille(): void {
    //S5
    const valueDiagS5 = this.diagnosisValues.find(
      (diag, index) => index + 5 === 5
    )?.value;
    const commentDiagS5 = this.diagnosisValues.find(
      (diag, index) => index + 5 === 5
    )?.comment;

    const valueConcS5 = this.concevoirValues.find(
      (diag, index) => index + 5 === 5
    )?.value;
    const commentConcS5 = this.concevoirValues.find(
      (diag, index) => index + 5 === 5
    )?.comment;

    const valueProdS5 = this.produireValues.find(
      (diag, index) => index + 5 === 5
    )?.value;
    const commentProdS5 = this.produireValues.find(
      (diag, index) => index + 5 === 5
    )?.comment;

    const valueValidS5 = this.validerValues.find(
      (diag, index) => index + 5 === 5
    )?.value;
    const commentValidS5 = this.validerValues.find(
      (diag, index) => index + 5 === 5
    )?.comment;

    const valuePilotS5 = this.piloterValues.find(
      (diag, index) => index + 5 === 5
    )?.value;
    const commentPilotS5 = this.piloterValues.find(
      (diag, index) => index + 5 === 5
    )?.comment;

    const valueAdaptS5 = this.adapterValues.find(
      (diag, index) => index + 5 === 5
    )?.value;
    const commentAdaptS5 = this.adapterValues.find(
      (diag, index) => index + 5 === 5
    )?.comment;

    const valueCommS5 = this.communiquerValues.find(
      (diag, index) => index + 5 === 5
    )?.value;
    const commentCommS5 = this.communiquerValues.find(
      (diag, index) => index + 5 === 5
    )?.comment;

    const comMAS5 = this.communicationValues.find(
      (comm) => comm.semestre === 5
    )?.comment1;
    const comTutorS5 = this.communicationValues.find(
      (comm) => comm.semestre === 5
    )?.comment2;

    let biannualAssesmentS5 = new BiannualAssesmentS5(
      valueDiagS5,
      commentDiagS5,
      valueConcS5,
      commentConcS5,
      valueProdS5,
      commentProdS5,
      valueValidS5,
      commentValidS5,
      valuePilotS5,
      commentPilotS5,
      valueAdaptS5,
      commentAdaptS5,
      valueCommS5,
      commentCommS5,
      comMAS5,
      comTutorS5
    );

    // S6
    const valueDiagS6 = this.diagnosisValues.find(
      (diag, index) => index + 5 === 6
    )?.value;
    const commentDiagS6 = this.diagnosisValues.find(
      (diag, index) => index + 5 === 6
    )?.comment;

    const valueConcS6 = this.concevoirValues.find(
      (diag, index) => index + 5 === 6
    )?.value;
    const commentConcS6 = this.concevoirValues.find(
      (diag, index) => index + 5 === 6
    )?.comment;

    const valueProdS6 = this.produireValues.find(
      (diag, index) => index + 5 === 6
    )?.value;
    const commentProdS6 = this.produireValues.find(
      (diag, index) => index + 5 === 6
    )?.comment;

    const valueValidS6 = this.validerValues.find(
      (diag, index) => index + 5 === 6
    )?.value;
    const commentValidS6 = this.validerValues.find(
      (diag, index) => index + 5 === 6
    )?.comment;

    const valuePilotS6 = this.piloterValues.find(
      (diag, index) => index + 5 === 6
    )?.value;
    const commentPilotS6 = this.piloterValues.find(
      (diag, index) => index + 5 === 6
    )?.comment;

    const valueAdaptS6 = this.adapterValues.find(
      (diag, index) => index + 5 === 6
    )?.value;
    const commentAdaptS6 = this.adapterValues.find(
      (diag, index) => index + 5 === 6
    )?.comment;

    const valueCommS6 = this.communiquerValues.find(
      (diag, index) => index + 5 === 6
    )?.value;
    const commentCommS6 = this.communiquerValues.find(
      (diag, index) => index + 5 === 6
    )?.comment;

    const comMAS6 = this.communicationValues.find(
      (comm) => comm.semestre === 6
    )?.comment1;
    const comTutorS6 = this.communicationValues.find(
      (comm) => comm.semestre === 6
    )?.comment2;

    let biannualAssesmentS6 = new BiannualAssesmentS6(
      valueDiagS6,
      commentDiagS6,
      valueConcS6,
      commentConcS6,
      valueProdS6,
      commentProdS6,
      valueValidS6,
      commentValidS6,
      valuePilotS6,
      commentPilotS6,
      valueAdaptS6,
      commentAdaptS6,
      valueCommS6,
      commentCommS6,
      comMAS6,
      comTutorS6
    );

    // S7
    const valueDiagS7 = this.diagnosisValues.find(
      (diag, index) => index + 5 === 7
    )?.value;
    const commentDiagS7 = this.diagnosisValues.find(
      (diag, index) => index + 5 === 7
    )?.comment;

    const valueConcS7 = this.concevoirValues.find(
      (diag, index) => index + 5 === 7
    )?.value;
    const commentConcS7 = this.concevoirValues.find(
      (diag, index) => index + 5 === 7
    )?.comment;

    const valueProdS7 = this.produireValues.find(
      (diag, index) => index + 5 === 7
    )?.value;
    const commentProdS7 = this.produireValues.find(
      (diag, index) => index + 5 === 7
    )?.comment;

    const valueValidS7 = this.validerValues.find(
      (diag, index) => index + 5 === 7
    )?.value;
    const commentValidS7 = this.validerValues.find(
      (diag, index) => index + 5 === 7
    )?.comment;

    const valuePilotS7 = this.piloterValues.find(
      (diag, index) => index + 5 === 7
    )?.value;
    const commentPilotS7 = this.piloterValues.find(
      (diag, index) => index + 5 === 7
    )?.comment;

    const valueAdaptS7 = this.adapterValues.find(
      (diag, index) => index + 5 === 7
    )?.value;
    const commentAdaptS7 = this.adapterValues.find(
      (diag, index) => index + 5 === 7
    )?.comment;

    const valueCommS7 = this.communiquerValues.find(
      (diag, index) => index + 5 === 7
    )?.value;
    const commentCommS7 = this.communiquerValues.find(
      (diag, index) => index + 5 === 7
    )?.comment;

    const comMAS7 = this.communicationValues.find(
      (comm) => comm.semestre === 7
    )?.comment1;
    const comTutorS7 = this.communicationValues.find(
      (comm) => comm.semestre === 7
    )?.comment2;

    let biannualAssesmentS7 = new BiannualAssesmentS7(
      valueDiagS7,
      commentDiagS7,
      valueConcS7,
      commentConcS7,
      valueProdS7,
      commentProdS7,
      valueValidS7,
      commentValidS7,
      valuePilotS7,
      commentPilotS7,
      valueAdaptS7,
      commentAdaptS7,
      valueCommS7,
      commentCommS7,
      comMAS7,
      comTutorS7
    );

    //S8

    // S8
    const valueDiagS8 = this.diagnosisValues.find(
      (diag, index) => index + 5 === 8
    )?.value;
    const commentDiagS8 = this.diagnosisValues.find(
      (diag, index) => index + 5 === 8
    )?.comment;

    const valueConcS8 = this.concevoirValues.find(
      (diag, index) => index + 5 === 8
    )?.value;
    const commentConcS8 = this.concevoirValues.find(
      (diag, index) => index + 5 === 8
    )?.comment;

    const valueProdS8 = this.produireValues.find(
      (diag, index) => index + 5 === 8
    )?.value;
    const commentProdS8 = this.produireValues.find(
      (diag, index) => index + 5 === 8
    )?.comment;

    const valueValidS8 = this.validerValues.find(
      (diag, index) => index + 5 === 8
    )?.value;
    const commentValidS8 = this.validerValues.find(
      (diag, index) => index + 5 === 8
    )?.comment;

    const valuePilotS8 = this.piloterValues.find(
      (diag, index) => index + 5 === 8
    )?.value;
    const commentPilotS8 = this.piloterValues.find(
      (diag, index) => index + 5 === 8
    )?.comment;

    const valueAdaptS8 = this.adapterValues.find(
      (diag, index) => index + 5 === 8
    )?.value;
    const commentAdaptS8 = this.adapterValues.find(
      (diag, index) => index + 5 === 8
    )?.comment;

    const valueCommS8 = this.communiquerValues.find(
      (diag, index) => index + 5 === 8
    )?.value;
    const commentCommS8 = this.communiquerValues.find(
      (diag, index) => index + 5 === 8
    )?.comment;

    const comMAS8 = this.communicationValues.find(
      (comm) => comm.semestre === 8
    )?.comment1;
    const comTutorS8 = this.communicationValues.find(
      (comm) => comm.semestre === 8
    )?.comment2;

    let biannualAssesmentS8 = new BiannualAssesmentS8(
      valueDiagS8,
      commentDiagS8,
      valueConcS8,
      commentConcS8,
      valueProdS8,
      commentProdS8,
      valueValidS8,
      commentValidS8,
      valuePilotS8,
      commentPilotS8,
      valueAdaptS8,
      commentAdaptS8,
      valueCommS8,
      commentCommS8,
      comMAS8,
      comTutorS8
    );

    // S9

    // S9
    const valueDiagS9 = this.diagnosisValues.find(
      (diag, index) => index + 5 === 9
    )?.value;
    const commentDiagS9 = this.diagnosisValues.find(
      (diag, index) => index + 5 === 9
    )?.comment;

    const valueConcS9 = this.concevoirValues.find(
      (diag, index) => index + 5 === 9
    )?.value;
    const commentConcS9 = this.concevoirValues.find(
      (diag, index) => index + 5 === 9
    )?.comment;

    const valueProdS9 = this.produireValues.find(
      (diag, index) => index + 5 === 9
    )?.value;
    const commentProdS9 = this.produireValues.find(
      (diag, index) => index + 5 === 9
    )?.comment;

    const valueValidS9 = this.validerValues.find(
      (diag, index) => index + 5 === 9
    )?.value;
    const commentValidS9 = this.validerValues.find(
      (diag, index) => index + 5 === 9
    )?.comment;

    const valuePilotS9 = this.piloterValues.find(
      (diag, index) => index + 5 === 9
    )?.value;
    const commentPilotS9 = this.piloterValues.find(
      (diag, index) => index + 5 === 9
    )?.comment;

    const valueAdaptS9 = this.adapterValues.find(
      (diag, index) => index + 5 === 9
    )?.value;
    const commentAdaptS9 = this.adapterValues.find(
      (diag, index) => index + 5 === 9
    )?.comment;

    const valueCommS9 = this.communiquerValues.find(
      (diag, index) => index + 5 === 9
    )?.value;
    const commentCommS9 = this.communiquerValues.find(
      (diag, index) => index + 5 === 9
    )?.comment;

    const comMAS9 = this.communicationValues.find(
      (comm) => comm.semestre === 9
    )?.comment1;
    const comTutorS9 = this.communicationValues.find(
      (comm) => comm.semestre === 9
    )?.comment2;

    let biannualAssesmentS9 = new BiannualAssesmentS9(
      valueDiagS9,
      commentDiagS9,
      valueConcS9,
      commentConcS9,
      valueProdS9,
      commentProdS9,
      valueValidS9,
      commentValidS9,
      valuePilotS9,
      commentPilotS9,
      valueAdaptS9,
      commentAdaptS9,
      valueCommS9,
      commentCommS9,
      comMAS9,
      comTutorS9
    );

    // S10
    const valueDiagS10 = this.diagnosisValues.find(
      (diag, index) => index + 5 === 10
    )?.value;
    const commentDiagS10 = this.diagnosisValues.find(
      (diag, index) => index + 5 === 10
    )?.comment;

    const valueConcS10 = this.concevoirValues.find(
      (diag, index) => index + 5 === 10
    )?.value;
    const commentConcS10 = this.concevoirValues.find(
      (diag, index) => index + 5 === 10
    )?.comment;

    const valueProdS10 = this.produireValues.find(
      (diag, index) => index + 5 === 10
    )?.value;
    const commentProdS10 = this.produireValues.find(
      (diag, index) => index + 5 === 10
    )?.comment;

    const valueValidS10 = this.validerValues.find(
      (diag, index) => index + 5 === 10
    )?.value;
    const commentValidS10 = this.validerValues.find(
      (diag, index) => index + 5 === 10
    )?.comment;

    const valuePilotS10 = this.piloterValues.find(
      (diag, index) => index + 5 === 10
    )?.value;
    const commentPilotS10 = this.piloterValues.find(
      (diag, index) => index + 5 === 10
    )?.comment;

    const valueAdaptS10 = this.adapterValues.find(
      (diag, index) => index + 5 === 10
    )?.value;
    const commentAdaptS10 = this.adapterValues.find(
      (diag, index) => index + 5 === 10
    )?.comment;

    const valueCommS10 = this.communiquerValues.find(
      (diag, index) => index + 5 === 10
    )?.value;
    const commentCommS10 = this.communiquerValues.find(
      (diag, index) => index + 5 === 10
    )?.comment;

    const comMAS10 = this.communicationValues.find(
      (comm) => comm.semestre === 10
    )?.comment1;
    const comTutorS10 = this.communicationValues.find(
      (comm) => comm.semestre === 10
    )?.comment2;

    let biannualAssesmentS10 = new BiannualAssesmentS10(
      valueDiagS10,
      commentDiagS10,
      valueConcS10,
      commentConcS10,
      valueProdS10,
      commentProdS10,
      valueValidS10,
      commentValidS10,
      valuePilotS10,
      commentPilotS10,
      valueAdaptS10,
      commentAdaptS10,
      valueCommS10,
      commentCommS10,
      comMAS10,
      comTutorS10
    );

    let biannualAssesmentRequest = new BiannualAssesmentRequest(
      biannualAssesmentS5,
      biannualAssesmentS6,
      biannualAssesmentS7,
      biannualAssesmentS8,
      biannualAssesmentS9,
      biannualAssesmentS10
    );

    this.grilleEvaluationService
      .enregistrerGrilleEvaluation(biannualAssesmentRequest, this.apprenticeId)
      .subscribe(
        (response: HttpResponse<any>) => {
          if (response.status === 200) {
            this.toastr.success('La grille a bien été enregistré', 'Succès', {
              closeButton: true,
            });
          }
        },
        (error) => {
          if (error.status === 200) {
            this.toastr.success('La grille a bien été enregistrée', 'Succès', {
              closeButton: true,
            });
          }
        }
      );
  }
}
