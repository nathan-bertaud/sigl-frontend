import { ApprenticeMentor } from "./ApprenticeMentor.model";
import { EducationalTutor } from "./EducationalTutor.model";
import { UserRequest } from "./UserRequest.model";
import { Document } from "./Document.model";

export class ApprenticeListing {
    name: string;
    firstName: string;
    email: string;
    educationalTutor: EducationalTutor;
    
    constructor(
      name: string,
      firstName: string,
      email: string,
      educationalTutor: EducationalTutor
    ) {
      this.name = name;
      this.firstName = firstName;
      this.email = email;
      this.educationalTutor = educationalTutor;
    }
  }