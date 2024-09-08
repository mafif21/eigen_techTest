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
      console.log(error);
      throw new ResponseError(500, "INTERNAL SERVER ERROR");
    }
  }

  async create(newBookrequest) {
    try {
      const newBook = validate(createBookValidation, newBookrequest);
      return await this.bookRepository.createBook(newBook);
    } catch (error) {
      throw new ResponseError(400, error.message);
    }
  }

  async delete(bookId) {
    try {
      const book = await this.bookRepository.getDetailBook(bookId);
      if (!book) {
        throw new ResponseError(404, "data not found");
      }

      const remove = await this.bookRepository.delete(book.id);
      return remove;
    } catch (error) {
      throw new ResponseError(400, error.message);
    }
  }
}

export default BookService;
