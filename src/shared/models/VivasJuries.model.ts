import { UserResponse } from "./UserResponse.model";

export class VivaJuries {
    id: number;
    juries:UserResponse[];
  
    constructor(
    id: number,
    juries:UserResponse[]
    ) {
      this.id=id;
      this.juries=juries;
    }
  }