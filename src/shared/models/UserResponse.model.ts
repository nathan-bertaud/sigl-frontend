import { Viva } from "./Viva.model";

export class UserResponse {

    id: number;
    name: string;
    firstName: string;
    birthDate: Date;
    email: string;
    password: string;
    vivas: Viva[];
  
    constructor(
      id: number,
      name: string,
      firstName: string,
      birthDate: Date,
      email: string,
      password: string,
      vivas: Viva[]
    ) {
      this.id = id;
      this.name = name;
      this.firstName = firstName;
      this.birthDate = birthDate;
      this.email = email;
      this.password = password;
      this.vivas = vivas;
    }
  }