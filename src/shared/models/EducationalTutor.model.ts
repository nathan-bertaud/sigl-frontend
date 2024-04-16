import { UserRequest } from "./UserRequest.model";

export class EducationalTutor extends UserRequest {
    specialization: string;
  
    constructor(
      user: UserRequest,
      specialization: string,
    ) {
      super(user.name, user.firstName, user.birthDate, user.email, user.password, []);
      this.specialization = specialization;
    }    
  }