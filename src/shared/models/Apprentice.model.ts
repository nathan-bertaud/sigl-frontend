import { ApprenticeMentor } from "./ApprenticeMentor.model";
import { EducationalTutor } from "./EducationalTutor.model";
import { UserRequest } from "./UserRequest.model";
import { Document } from "./Document.model";

export class Apprentice extends UserRequest {
    currentYear: number;
    majorSpecialization: string;
    minorSpecialization: string;
    apprenticeMentor: {"id": number};
    educationalTutor: {"id": number};
    documents: Document[];
    events: Event[];
  
    constructor(
      user: UserRequest,
      currentYear: number,
      majorSpecialization: string,
      minorSpecialization: string,
      apprenticeMentor: {"id": number},
      educationalTutor: {"id": number},
      documents: Document[],
      events: Event[]
    ) {
      super(user.name, user.firstName, user.birthDate, user.email, user.password, user.vivas);
      this.currentYear = currentYear;
      this.majorSpecialization = majorSpecialization;
      this.minorSpecialization = minorSpecialization;
      this.apprenticeMentor = apprenticeMentor;
      this.educationalTutor = educationalTutor;
      this.documents = documents;
      this.events = events;
    }
  }