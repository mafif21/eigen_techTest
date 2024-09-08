import { prismaClient } from "../app/database.js";

class BookLoanRepository {
  constructor() {
    this.prisma = prismaClient;
  }

  async findAllLoans(filter = {}, page = 1) {
    try {
      const whereCondition = {};

      Object.keys(filter).forEach((key) => {
        whereCondition[key] = filter[key];
      });

      const loans = await this.prisma.memberBorrowBook.findMany({
        where: whereCondition,
        orderBy: {
          borrowedAt: "desc",
        },
        skip: (page - 1) * 10,
        take: 10,
      });

      return loans;
    } catch (error) {
      throw error;
    }
  }

  async getDetailLoan(loanId) {
    try {
      const loan = await this.prisma.memberBorrowBook.findUnique({
        where: {
          id: loanId,
        },
      });
      return loan;
    } catch (error) {
      throw error;
    }
  }

  async create(bookLoan) {
    try {
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
  }

  async update(existingLoan, isPenalize) {
    try {
      const [loan, book, member] = await this.prisma.$transaction(
        async (prisma) => {
          const loan = await prisma.memberBorrowBook.update({
            where: {
              id: existingLoan.id,
            },
            data: {
              returnedAt: existingLoan.returnedAt,
            },
          });

          const book = await prisma.book.update({
            where: {
              id: existingLoan.bookId,
            },
            data: {
              stock: {
                increment: 1,
              },
            },
          });

          if (isPenalize) {
            const penalizeUntil = new Date(existingLoan.borrowedAt);
            penalizeUntil.setDate(penalizeUntil.getDate() + 3);

            await prisma.member.update({
              where: {
                id: existingLoan.memberId,
              },
              data: {
                penalize: true,
                penalizeUntil: penalizeUntil,
              },
            });
          }

          return [loan, book];
        }
      );

      return loan;
    } catch (error) {
      throw error;
    }
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
