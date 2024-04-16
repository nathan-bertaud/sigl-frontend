import { Viva } from "./Viva.model";

export class UserRequest {

    name: string;
    firstName: string;
    birthDate: Date;
    email: string;
    password: string;
    vivas: Viva[];
  
    constructor(
      name: string,
      firstName: string,
      birthDate: Date,
      email: string,
      password: string,
      vivas: Viva[]
    ) {
      this.name = name;
      this.firstName = firstName;
      this.birthDate = birthDate;
      this.email = email;
      this.password = password;
      this.vivas = vivas;
    }
  }
  