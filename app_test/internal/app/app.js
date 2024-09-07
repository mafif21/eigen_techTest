import express from "express";
import BookRepository from "../repositories/book_repository.js";
import BookService from "../services/book_service.js";
import BookController from "../controllers/book_controller.js";
import { errorMiddleware } from "../middleware/error_middleware.js";
import MemberRepository from "../repositories/member_repository.js";
import MemberService from "../services/member_service.js";
import MemberController from "../controllers/member_controller.js";
import { apiRoute } from "../route/api.js";

const app = express();
app.use(express.json());

const bookRepository = new BookRepository();
const bookService = new BookService(bookRepository);
const bookController = new BookController(bookService);

const memberRepository = new MemberRepository();
const memberService = new MemberService(memberRepository);
const memberController = new MemberController(memberService);

app.use("/api", apiRoute(bookController, memberController));
app.use(errorMiddleware);

export default app;
