import express from "express";
import BookRepository from "../repositories/book_repository.js";
import BookService from "../services/book_service.js";
import BookController from "../controllers/book_controller.js";
import { errorMiddleware } from "../middleware/error_middleware.js";
import MemberRepository from "../repositories/member_repository.js";
import MemberService from "../services/member_service.js";
import MemberController from "../controllers/member_controller.js";

const app = express();
app.use(express.json());
app.use(errorMiddleware);

const bookRepository = new BookRepository();
const bookService = new BookService(bookRepository);
const bookController = new BookController(bookService);

const memberRepository = new MemberRepository();
const memberService = new MemberService(memberRepository);
const memberController = new MemberController(memberService);

app.get("/api/books", (req, res, next) =>
  bookController.getAll(req, res, next)
);
app.post("/api/books", (req, res, next) =>
  bookController.createBook(req, res, next)
);
app.get("/api/members", (req, res, next) =>
  memberController.getAll(req, res, next)
);
app.get("/api/members/:id", (req, res, next) =>
  memberController.getMemberById(req, res, next)
);
app.post("/api/members", (req, res, next) =>
  memberController.createMember(req, res, next)
);

export default app;
