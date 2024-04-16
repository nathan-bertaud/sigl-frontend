import { UserRequest } from "./UserRequest.model";

export class ApprenticeMentor extends UserRequest {
    company: string;
    specialization: string;
  
    constructor(
      user: UserRequest,
      company: string,
      specialization: string,
    ) {
      super(user.name, user.firstName, user.birthDate, user.email, user.password, []);
      this.company = company;
      this.specialization = specialization;
    }
    getFirstName(){
      return this.firstName;
    }
  }