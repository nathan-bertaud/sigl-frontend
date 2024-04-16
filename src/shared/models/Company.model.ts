export class Company {
  privateCompany: boolean;
  publicCompany: boolean;
  name: string;
  address: string;
  zipCode: number;
  city: string;
  phoneNumber: string;
  email: string;
  siret: string;
  bossType: string;
  specificBoss: string;
  activityCode: string;
  employeeNumber: number;
  convention: string;
  idcCode: string;

  constructor(
    privateCompany: boolean,
    publicCompany: boolean,
    name: string,
    address: string,
    zipCode: number,
    city: string,
    phoneNumber: string,
    email: string,
    siret: string,
    bossType: string,
    specificBoss: string,
    activityCode: string,
    employeeNumber: number,
    convention: string,
    idcCode: string
  ) {
    this.privateCompany = privateCompany;
    this.publicCompany = publicCompany;
    this.name = name;
    this.address = address;
    this.zipCode = zipCode;
    this.city = city;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.siret = siret;
    this.bossType = bossType;
    this.specificBoss = specificBoss;
    this.activityCode = activityCode;
    this.employeeNumber = employeeNumber;
    this.convention = convention;
    this.idcCode = idcCode;
  }
}
