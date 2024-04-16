import { Apprentice } from "./Apprentice.model";
import { Mark } from "../enums/Mark.enum";
import { UserRequest } from "./UserRequest.model";
import { Status } from "../enums/Status.enum";
import { Event } from "./Event.model";
import { Document } from "./Document.model";


export class Viva extends Event {
    juries: UserRequest[];
    mark: Mark;
    status: Status;
    documents: Document[];
  
    constructor(
      id:number,
      apprentice: Apprentice,
      titre: string,
      startDate: Date,
      endDate: Date,
      semestre: string,
      place: string,
      juries: UserRequest[],
      mark: Mark,
      status: Status,
      documents: Document[]
    ) {
      super(id,apprentice,titre,startDate, endDate,semestre, place);
      this.juries = juries;
      this.mark = mark;
      this.status = status;
      this.documents = documents;
    }
  }