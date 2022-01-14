export interface User {
    id: string;
    fname: string;
    lname: string;
    email: string;
    role: string;
}

export interface Course{
  id:string,
  title: string,
  description:string,
  category:string,
  terms:Term[],
}

export interface Term {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
}

export interface Review {
  id: string;
  note: number;
  text: string;
}
export interface Chapter {
  id: string;
  name: string;
  reviews:Review[];
  moyenne:number;
  number_of_reviews:number;
}

export interface ChapterStudent {
  id: string;
  name: string;
  isReviewed:boolean;
}

export interface Category {
  id: string;
  name: string;
}
