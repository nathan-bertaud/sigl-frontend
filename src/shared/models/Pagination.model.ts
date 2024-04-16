export interface Pagination {
    content: any[]; 
    pageable: {
      pageNumber: number;
      pageSize: number;
    };
    totalElements: number;
  }
  