import { Apprentice } from "./Apprentice.model";

export class Note {
    title: string;
    startDate: Date;
    endDate: Date;
    resume : string;


    constructor(title: string, startDate: Date, endDate: Date, resume: string) {
      this.title = title;
      this.startDate = startDate;
      this.endDate = endDate;
      this.resume = resume;
    }
  }

