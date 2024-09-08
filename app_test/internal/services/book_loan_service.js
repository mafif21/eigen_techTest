import { ResponseError } from "../error/response_error.js";
import { bookLoanValidation } from "../validation/book_loan_validation.js";
import { validate } from "../validation/validation.js";

class BookLoanservice {
  constructor(loanRepository, memberRepository, bookRepository) {
    this.loanRepository = loanRepository;
    this.memberRepository = memberRepository;
    this.bookRepository = bookRepository;
  }

  async create(newLoanRequest) {
    try {
      const newLoan = validate(bookLoanValidation, newLoanRequest);
      const member = await this.memberRepository.getDetailMember(
        newLoan.memberId
      );
      if (member == null) {
        throw new ResponseError(404, "member not found");
      }

      if (member.books.length >= 2) {
        throw new ResponseError(400, "cant borrow more than 2 books");
      }

      if (member.penalize) {
        throw new ResponseError(400, "member get penalize");
      }

      const book = await this.bookRepository.getDetailBook(newLoan.bookId);
      if (book == null) {
        throw new ResponseError(404, "book not found");
      }

      if (book.stock <= 0) {
        throw new ResponseError(400, "book not available");
      }

      const result = await this.loanRepository.create(newLoan);
      return result;
    } catch (error) {
      throw new ResponseError(400, error.message);
    }
  }
}

export default BookLoanservice;
