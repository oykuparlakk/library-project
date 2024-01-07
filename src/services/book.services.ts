import { BookDetailsDTO, BookDTO } from "@/types/type";
import { getRepository } from "typeorm";
import { Book } from "../entity/Book";

export class BookService {
  async getBookDetails(bookId: number): Promise<BookDetailsDTO> {
    const bookRepository = getRepository(Book);
    const book = await bookRepository.findOne(bookId);

    if (!book) {
      throw new Error("Book not found.");
    }

    return book;
  }

  async createBook(name: string): Promise<BookDTO> {
    const bookRepository = getRepository(Book);
    const newBook = bookRepository.create({ name, score: 0 });
    return await bookRepository.save(newBook);
  }

  async getAllBooks(): Promise<BookDTO[]> {
    const bookRepository = getRepository(Book);
    return await bookRepository.find();
  }
}
