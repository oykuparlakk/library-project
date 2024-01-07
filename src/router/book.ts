import express, { Router } from "express";
import { BookController } from "../controllers/book.controller";

const bookRouter: Router = express.Router();
const bookController = new BookController();

bookRouter.post("/", async (req, res) => {
  await bookController.createBook(req, res);
});

bookRouter.get("/", async (req, res) => {
  await bookController.getAllBooks(req, res);
});

bookRouter.get("/:bookId", async (req, res) => {
  await bookController.getBookDetails(req, res);
});

export default bookRouter;
