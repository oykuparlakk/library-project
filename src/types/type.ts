export interface BorrowResultDTO {
  success: boolean;
  data?: Loan;
  error?: {
    message: string;
  };
}

export class BookDTO {
  id!: number;
  name!: string;
  score!: number;
}

export class BookDetailsDTO {
  id!: number;
  name!: string;
  score!: number;
}

export interface Book {
  id: number;
  name: string;
  score: number;
}

export interface Loan {
  id: number;
  rating: number | null;
  returnedAt: Date | null;
  book: Book;
}

export interface UserDetails {
  currentLoans: Loan[];
  pastLoans: Loan[];
}

export interface UserDetailsResponse {
  message: string;
  userDetails?: UserDetails;
}

export interface CreateUserResponse {
  user: User;
  message: string;
}

export interface User {
  id: number;
  email: string;
}

export interface GetAllUsersResponse {
  message: string;
  users: User[];
}

export interface BookDetailsResponse {
  message: string;
  bookDetails?: Book;
}

export interface CreateBookResponse {
  message: string;
  book?: Book;
}

export interface GetAllBooksResponse {
  message: string;
  books: Book[];
}
