import { ResponseError } from "../error/response_error.js";
import { createBookValidation } from "../validation/book_validation.js";
import { validate } from "../validation/validation.js";

class BookService {
  constructor(bookRepository) {
    this.bookRepository = bookRepository;
  }

  async getAllBooks(page = 1) {
    try {
      const filter = { stock: { gt: 0 } };
      const books = await this.bookRepository.findAllBook(filter, page);
      return {
        books,
      };
    } catch (error) {
      throw new ResponseError(500, "INTERNAL SERVER ERROR");
    }
  }

  async create(newBookrequest) {
    try {
      const newBook = validate(createBookValidation, newBookrequest);
      return await this.bookRepository.createBook(newBook);
    } catch (error) {
      throw new ResponseError(400, "data not valid");
    }
  }
}

export default BookService;
