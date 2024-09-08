class BookLoanController {
  constructor(loanService) {
    this.loanService = loanService;
  }

  async getAll(req, res, next) {
    try {
      const page = req.params.page;
      const result = await this.loanService.getAllLoans(page);
      res.status(200).json({
        status: 200,
        message: "success get all loans",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async getLoanById(req, res, next) {
    try {
      const loanId = req.params.id;
      const result = await this.loanService.getDetailLoan(loanId);
      res.status(200).json({
        status: 200,
        message: `success get loan with id ${loanId}`,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async bookLoan(req, res, next) {
    try {
      const request = req.body;
      const result = await this.loanService.create(request);
      res.status(200).json({
        status: 200,
        message: "success loan book",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async bookReturn(req, res, next) {
    try {
      const id = req.params.id;
      const result = await this.loanService.returnBook(id);
      res.status(200).json({
        status: 200,
        message: "success return book",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default BookLoanController;
