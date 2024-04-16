export class UserNameFirstNameIdDto{
  id: number;
    name: string;
    firstName: string;
    constructor(
      id:number,
        name: string,
        firstName: string,
      ) {
        this.id=id;
        this.name = name;
        this.firstName = firstName;
      }

}