import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Pagination } from "src/shared/models/Pagination.model";
import { UserNameFirstNameIdDto } from "src/shared/models/UserNameFirstNameIdDto.model";

@Injectable({
    providedIn: 'root',
  })
  export class VivaService {
    constructor(private http: HttpClient) {}
  
    private apiUrl = '/api';
  
    getJuries(page: number, size: number):Observable<Pagination>{
        const url = `${this.apiUrl}/viva/getVivas`;
        return this.http.get<Pagination>(url,{ params: { page, size }}); 
    }

    getApprentices():Observable<UserNameFirstNameIdDto[]>{
      const url = `${this.apiUrl}/apprentice/getapprentices`;
      return this.http.get<UserNameFirstNameIdDto[]>(url); 
  }

    editViva(id:number,startDate: Date,endDate: Date,idApprentice:number,title:string,semestre:string,place:string){
      const url = `${this.apiUrl}/viva/editViva`;
      const body = {id,startDate,endDate,idApprentice,title,semestre,place};
        return this.http.post(url, body, { observe: 'response' });
    }
  }