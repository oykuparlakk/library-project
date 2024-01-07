import { BookDetailsResponse, CreateBookResponse, GetAllBooksResponse } from "@/types/type";
import { Request, Response } from "express";
import { BookService } from "../services/book.services";

export class BookController {
  private bookService: BookService;

  constructor() {
    this.bookService = new BookService();
  }

  async getBookDetails(req: Request, res: Response): Promise<void> {
    try {
      const bookId = parseInt(req.params.bookId);
      const bookDetails = await this.bookService.getBookDetails(bookId);

      const response: BookDetailsResponse = {
        message: 'Book details retrieved successfully.',
        bookDetails,
      };

      res.status(200).json(response);
    } catch (error) {
      console.error('Error fetching book details:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async createBook(req: Request, res: Response): Promise<void> {
    try {
      const { name } = req.body;
      const newBook = await this.bookService.createBook(name);

      const response: CreateBookResponse = {
        message: "New book has been successfully saved. The score has not been determined yet.",
        book: newBook,
      };

      res.status(201).json(response);
    } catch (error) {
      console.error("Error saving book:", error);
      res.status(500).json({ message: "An error occurred while saving the book." });
    }
  }

  async getAllBooks(req: Request, res: Response): Promise<void> {
    try {
      const books = await this.bookService.getAllBooks();

      const response: GetAllBooksResponse = {
        message: "Getting book list with ids and scores",
        books,
      };

      res.status(200).json(response);
    } catch (error) {
      console.error("Error fetching books:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
