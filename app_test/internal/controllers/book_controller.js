class BookController {
  constructor(bookService) {
    this.bookService = bookService;
  }

  async getAll(req, res, next) {
    try {
      const page = req.params.page;
      const result = await this.bookService.getAllBooks(page);
      res.status(200).json({
        status: 200,
        message: "success get all books",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async createBook(req, res, next) {
    try {
      const request = req.body;
      const result = await this.bookService.create(request);
      res.status(201).json({
        status: 201,
        message: "success create new data",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteBook(req, res, next) {
    try {
      const id = req.params.id;
      if (!id) {
        return res.status(400).json({
          status: 400,
          message: "ID is required",
        });
      }

      const _ = await this.bookService.delete(id);
      res.status(200).json({
        status: 201,
        message: "success delete data",
      });
    } catch (error) {
      next(error);
    }
  }
}

export default BookController;
