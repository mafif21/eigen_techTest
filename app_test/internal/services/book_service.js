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
      const results = await this.bookRepository.findAllBook(filter, page);
      return results;
    } catch (error) {
      throw new ResponseError(500, "INTERNAL SERVER ERROR");
    }
  }

  async create(newBookrequest) {
    try {
      const newBook = validate(createBookValidation, newBookrequest);
      return await this.bookRepository.createBook(newBook);
    } catch (error) {
      if (error instanceof ResponseError) {
        throw error;
      }
      throw new ResponseError(400, error.message);
    }
  }
}

export default BookService;
