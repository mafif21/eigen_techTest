import express from "express";
import BookRepository from "../repositories/book_repository.js";
import BookService from "../services/book_service.js";
import BookController from "../controllers/book_controller.js";
import { errorMiddleware } from "../middleware/error_middleware.js";
import MemberRepository from "../repositories/member_repository.js";
import MemberService from "../services/member_service.js";
import MemberController from "../controllers/member_controller.js";
import { apiRoute } from "../route/api.js";
import BookLoanRepository from "../repositories/book_loan_repository.js";
import BookLoanservice from "../services/book_loan_service.js";
import BookLoanController from "../controllers/book_loan _controller.js";

const app = express();
app.use(express.json());

const bookRepository = new BookRepository();
const bookService = new BookService(bookRepository);
const bookController = new BookController(bookService);

const memberRepository = new MemberRepository();
const memberService = new MemberService(memberRepository);
const memberController = new MemberController(memberService);

const loanRepository = new BookLoanRepository();
const loanService = new BookLoanservice(
  loanRepository,
  memberRepository,
  bookRepository
);
const loanController = new BookLoanController(loanService);

app.use("/api", apiRoute(bookController, memberController, loanController));
app.use(errorMiddleware);

export default app;
