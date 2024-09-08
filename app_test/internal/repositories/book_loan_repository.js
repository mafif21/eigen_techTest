import { prismaClient } from "../app/database.js";

class BookLoanRepository {
  constructor() {
    this.prisma = prismaClient;
  }

  async create(bookLoan) {
    try {
      console.log(bookLoan);
      const [loan, book] = await this.prisma.$transaction(async (prisma) => {
        const loan = await prisma.memberBorrowBook.create({
          data: bookLoan,
        });
        const book = await prisma.book.update({
          where: {
            id: bookLoan.bookId,
          },
          data: {
            stock: {
              decrement: 1,
            },
          },
        });

        return [loan, book];
      });

      return loan;
    } catch (error) {
      throw error;
    }
    /**
     * transaction
     * after create loan
     * - insert 1 data
     * - update book stock
     */
  }

  async update() {
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
