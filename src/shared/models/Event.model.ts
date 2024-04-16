import { Apprentice } from "./Apprentice.model";

export class Event {
  id:number;
  apprentice: Apprentice;
  title: string;
  startDate: Date;
  endDate: Date;
  place: string;
  semestre: string;

  constructor(
    id:number,
    apprentice: Apprentice,
    title: string,
    startDate: Date,
    endDate: Date,
    place: string,
    semestre: string
  ) {
    this.id=id;
    this.apprentice = apprentice;
    this.title = title;
    this.startDate = startDate;
    this.endDate = endDate;
    this.place = place;
    this.semestre = semestre;
  }
}
