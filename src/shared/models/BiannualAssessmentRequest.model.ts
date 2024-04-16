import { BiannualAssesmentS10 } from "./BiannualAssessmentS10.model";
import { BiannualAssesmentS5 } from "./BiannualAssessmentS5.model";
import { BiannualAssesmentS6 } from "./BiannualAssessmentS6.model";
import { BiannualAssesmentS7 } from "./BiannualAssessmentS7.model";
import { BiannualAssesmentS8 } from "./BiannualAssessmentS8.model";
import { BiannualAssesmentS9 } from "./BiannualAssessmentS9.model";

export class BiannualAssesmentRequest {

      biannualAssessmentS5: BiannualAssesmentS5;
      biannualAssessmentS6 : BiannualAssesmentS6;
      biannualAssessmentS7: BiannualAssesmentS7;
      biannualAssessmentS8 : BiannualAssesmentS8;
      biannualAssessmentS9 : BiannualAssesmentS9;
      biannualAssessmentS10 : BiannualAssesmentS10;

      constructor(biannualAssessmentS5: BiannualAssesmentS5,
        biannualAssessmentS6: BiannualAssesmentS6,
        biannualAssessmentS7: BiannualAssesmentS7,
        biannualAssessmentS8: BiannualAssesmentS8,
        biannualAssessmentS9: BiannualAssesmentS9,
        biannualAssessmentS10: BiannualAssesmentS10
        ){
            this.biannualAssessmentS5 =  biannualAssessmentS5;
            this.biannualAssessmentS6 =  biannualAssessmentS6;
            this.biannualAssessmentS7 =  biannualAssessmentS7;
            this.biannualAssessmentS8 =  biannualAssessmentS8;
            this.biannualAssessmentS9 =  biannualAssessmentS9;
            this.biannualAssessmentS10 =  biannualAssessmentS10;
      }
}
