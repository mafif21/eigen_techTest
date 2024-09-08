class BookLoanController {
  constructor(loanService) {
    this.loanService = loanService;
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
}

export default BookLoanController;
