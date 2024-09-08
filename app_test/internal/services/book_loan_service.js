import { ResponseError } from "../error/response_error.js";
import { bookLoanValidation } from "../validation/book_loan_validation.js";
import { validate } from "../validation/validation.js";

class BookLoanservice {
  constructor(loanRepository, memberRepository, bookRepository) {
    this.loanRepository = loanRepository;
    this.memberRepository = memberRepository;
    this.bookRepository = bookRepository;
  }

  async getAllLoans(page = 1) {
    try {
      const filter = {};
      const result = await this.loanRepository.findAllLoans(filter, page);
      return result;
    } catch (error) {
      console.log(error);
      throw new ResponseError(500, "INTERNAL SERVER ERROR");
    }
  }

  async getDetailLoan(loanId) {
    try {
      const result = await this.loanRepository.getDetailLoan(loanId);
      if (result == null) {
        throw new ResponseError(404, "data not found");
      }

      return result;
    } catch (error) {
      throw new ResponseError(404, error.message);
    }
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

  async returnBook(loanId) {
    try {
      const foundLoan = await this.loanRepository.getDetailLoan(loanId);
      let penalize = false;
      if (!foundLoan) {
        throw new ResponseError(404, "data not found");
      }

      if (foundLoan.returnedAt != null) {
        throw new ResponseError(400, "book already return");
      }

      const today = new Date();
      const borrowedAt = new Date(foundLoan.borrowerAt);

      const timeDiff = today - borrowedAt;
      const daysDiff = timeDiff / (1000 * 60 * 60 * 24);

      if (daysDiff > 7) {
        penalize = true;
      }

      foundLoan.returnedAt = today;

      const result = await this.loanRepository.update(foundLoan, penalize);
      return result;
    } catch (error) {
      throw new ResponseError(404, error.message);
    }
  }
}

export default BookLoanservice;
