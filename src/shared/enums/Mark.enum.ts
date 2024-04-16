export interface Mark {
    label: string;
    value: number;
  }
  
  export const MarkEnum: { [key: string]: Mark } = {
    ZERO: { label: "0", value: 0 },
    UN: { label: "1", value: 1 },
    DEUX: { label: "2", value: 2 },
    TROIS: { label: "3", value: 3 },
    QUATRE: { label: "4", value: 4 },
    CINQ: { label: "5", value: 5 },
    SIX: { label: "6", value: 6 },
    SEPT: { label: "7", value: 7 },
    HUIT: { label: "8", value: 8 },
    NEUF: { label: "9", value: 9 },
    DIX: { label: "10", value: 10 },
    ONZE: { label: "11", value: 11 },
    DOUZE: { label: "12", value: 12 },
    TREIZE: { label: "13", value: 13 },
    QUATORZE: { label: "14", value: 14 },
    QUINZE: { label: "15", value: 15 },
    SEIZE: { label: "16", value: 16 },
    DIX_SEPT: { label: "17", value: 17 },
    DIX_HUIT: { label: "18", value: 18 },
    DIX_NEUF: { label: "19", value: 19 },
    VINGT: { label: "20", value: 20 },
    AJOURNE: { label: "Ajourné", value: -1 },
    ANNULE: { label: "Annulé", value: -2 },
    ABSENT: { label: "Absent", value: -3 }
  };
  