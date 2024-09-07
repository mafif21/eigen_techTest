class BookLoanRepository {
  constructor() {
    this.prisma = prismaClient;
  }

  async createBookLoan() {
    /**
     * transaction
     * after create loan
     * - insert 1 data
     * - update book stock
     */
  }

  async returnBook() {
    /**
     * transaction
     * after return book
     * - update returnedAt column
     * - update member if has pinalize and update penalize until
     * - update book stock
     */
  }
}

export default BookLoanRepository;
