
export class DocumentResponse {
  documentNames: string;
  documentUploadDates: string; 
  documentSemester: string;
  documentId: number;
  documentAuthor: string;
  documentType: string;
  documentKeyword1: string;
  documentKeyword2: string;
  documentKeyword3: string;
  documentKeyword4: string;

  constructor(documentNames: string, documentUploadDates: string, documentSemester: string, documentId: number,
    documentAuthor: string, documentType: string, documentKeyword1: string, documentKeyword2: string, documentKeyword3: string, documentKeyword4: string) {
    this.documentNames = documentNames;
    this.documentUploadDates = documentUploadDates;
    this.documentSemester = documentSemester;
    this.documentId=documentId;
    this.documentAuthor= documentAuthor;
    this.documentType= documentType;
    this.documentKeyword1= documentKeyword1;
    this.documentKeyword2= documentKeyword2;
    this.documentKeyword3= documentKeyword3;
    this.documentKeyword4 = documentKeyword4;
  }
}