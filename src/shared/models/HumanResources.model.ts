import { UserRequest } from "./UserRequest.model";
import { Viva } from "./Viva.model";

export class HumanResources extends UserRequest {
    company: string;
  
    constructor(
      name: string,
      firstName: string,
      birthDate: Date,
      email: string,
      password: string,
      company: string,
      vivas: Viva[],
    ) {
      super(name, firstName, birthDate, email, password, vivas);
      this.company = company;
    }
  }