import { prismaClient } from "../app/database.js";
class BookRepository {
  constructor(db) {
    this.prisma = prismaClient;
  }

  async findAllBook(filter = {}, page = 1) {
    try {
      const whereCondition = {};

      Object.keys(filter).forEach((key) => {
        whereCondition[key] = filter[key];
      });

      const books = await this.prisma.book.findMany({
        where: whereCondition,
        orderBy: {
          created_at: "desc",
        },
        skip: (page - 1) * 10,
        take: 10,
      });

      return books;
    } catch (error) {
      throw error;
    }
  }

  async createBook(newBook) {
    try {
      const createBook = await this.prisma.book.create({
        data: newBook,
        select: {
          id: true,
          code: true,
          title: true,
          author: true,
          stock: true,
        },
      });

      return createBook;
    } catch (error) {
      throw error;
    }
  }
}

export default BookRepository;
