import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Observable } from "rxjs";
import { HumanResources } from '../../shared/models/HumanResources.model';

@Injectable()
export class CompteEntrepriseService {

    constructor(private http: HttpClient,
        private formBuilder: FormBuilder) {
    }

    private urlCompteEntreprise = '/api/addhumanresources';
    
      compteEntrepriseCreation(humanResources: HumanResources): Observable<HttpResponse<any>> {
        return this.http.post<any>(this.urlCompteEntreprise, humanResources, { observe: 'response' });
    }
}