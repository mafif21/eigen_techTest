import express from "express";
import BookRepository from "../repositories/book_repository.js";
import BookService from "../services/book_service.js";
import BookController from "../controllers/book_controller.js";
import { errorMiddleware } from "../middleware/error_middleware.js";

const app = express();
app.use(express.json());
app.use(errorMiddleware);

const bookRepository = new BookRepository();
const bookService = new BookService(bookRepository);
const bookController = new BookController(bookService);

app.get("/books", (req, res, next) => bookController.getAll(req, res, next));
app.post("/books", (req, res, next) =>
  bookController.createBook(req, res, next)
);

export default app;
