import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Observable } from "rxjs";
import { Company } from "src/shared/models/Company.model";

@Injectable()
export class CertificatCerfaService {

    constructor(private http: HttpClient,
        private formBuilder: FormBuilder) {
    }

    private urlCertificatCerfa = '/api/addcompany';
    
      addCompany(company : Company): Observable<HttpResponse<any>> {
        return this.http.post<any>(this.urlCertificatCerfa, company , { observe: 'response' });
    }
}