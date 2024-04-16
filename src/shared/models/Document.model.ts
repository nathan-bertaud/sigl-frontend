import { Apprentice } from "./Apprentice.model";

export class Document {

    apprentice: Apprentice;
    date: Date;
    deadline: Date;
    place: String

    constructor(
        apprentice: Apprentice,
        date: Date,
        deadline: Date,
        place: String
      ) {
        this.apprentice = apprentice;
        this.date = date;
        this.deadline = deadline;
        this.place = place;
      }
}