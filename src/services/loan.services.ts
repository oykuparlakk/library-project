import { Book } from "../entity/Book";
import { Loan } from "../entity/Loan";
import { User } from "../entity/User";
import { getRepository } from "typeorm";
import { BorrowResultDTO } from "@/types/type";


export class LoanService {
  async borrowBook(userId: number, bookId: number): Promise<BorrowResultDTO> {
    try {
      const userRepository = getRepository(User);
      const bookRepository = getRepository(Book);
      const loanRepository = getRepository(Loan);

      const user = await userRepository.findOne(userId);
      const book = await bookRepository.findOne(bookId);

      if (!user) {
        throw new Error("User not found.");
      }

      if (!book) {
        throw new Error("Book not found.");
      }
      const existingLoan = await loanRepository.findOne({
        where: { book: book, returnedAt: null },
        relations: ["user"],
      });

      if (existingLoan && existingLoan.user?.id === userId) {
        throw new Error("You already have this book.");
      }

      if (existingLoan) {
        throw new Error("This book is already borrowed by someone else.");
      }
      const loan = new Loan();
      loan.user = user;
      loan.book = book;

      await loanRepository.save(loan);

      return {
        success: true,
        data: loan,
      };
    } catch (error) {
      console.error(error);

      const errorMessage =
        (error as Error).message || "Error borrowing the book.";
      return {
        success: false,
        error: {
          message: errorMessage,
        },
      };
    }
  }

  async returnAndRateBook(
    userId: number,
    bookId: number,
    rating: number
  ): Promise<void> {
    const loanRepository = getRepository(Loan);
    const bookRepository = getRepository(Book);

    const book = await bookRepository.findOne(bookId);

    if (!book) {
      throw new Error("Book not found.");
    }

    const user = await bookRepository.findOne(userId);

    if (!user) {
      throw new Error("User not found.");
    }
    const loan = await loanRepository.findOne({
      where: {
        user: userId,
        book: bookId,
        returnedAt: null,
      },
    });

    if (!loan) {
      throw new Error("The user has not borrowed this book.");
    }

    book.score = book.score !== 0 ? (book.score + rating) / 2 : rating;
    await bookRepository.save(book);
    loan.returnedAt = new Date();
    loan.rating = rating;
    await loanRepository.save(loan);
  }
}
