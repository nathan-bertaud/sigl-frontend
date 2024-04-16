export class BiannualAssesmentS8 {
  valueDiag: number | undefined;
  commDiag: string | undefined;

  valueConcevoir: number | undefined;
  commConcevoir: string | undefined; 

  valueProduire: number | undefined;
  commProduire: string | undefined;

  valueValider: number | undefined;
  commValider: string | undefined;

  valuePiloter: number | undefined;
  commPiloter: string | undefined;

  valueAdapter: number | undefined;
  commAdapter: string | undefined;

  valueCommuniquer: number | undefined;
  commCommuniquer: string | undefined;

  comMA: string | undefined;
  comTutor: string | undefined;


  constructor(
    valueDiag: number  | undefined,
    commDiag: string | undefined,

    valueConcevoir: number | undefined,
    commConcevoir: string | undefined,

    valueProduire: number | undefined,
    commProduire: string | undefined,

    valueValider: number | undefined,
    commValider: string | undefined,

    valuePiloter: number | undefined,
    commPiloter: string | undefined,

    valueAdapter: number | undefined,
    commAdapter: string | undefined,

    valueCommuniquer: number | undefined,
    commCommuniquer: string | undefined,

    comMA: string | undefined,
    comTutor: string | undefined,


  ) {
    this.valueDiag = valueDiag;
    this.commDiag = commDiag;
    this.valueConcevoir = valueConcevoir;
    this.commConcevoir = commConcevoir;
    this.valueProduire = valueProduire;
    this.commProduire = commProduire;
    this.valuePiloter = valuePiloter;
    this.commPiloter = commPiloter;
    this.valueAdapter = valueAdapter;
    this.commAdapter = commAdapter;
    this.valueValider = valueValider;
    this.commValider = commValider;
    this.valueCommuniquer = valueCommuniquer;
    this.commCommuniquer = commCommuniquer;
    this.comMA = comMA;
    this.comTutor = comTutor;
  }
}
