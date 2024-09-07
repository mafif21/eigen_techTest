import { prismaClient } from "../app/database.js";

class MemberRepository {
  constructor() {
    this.prisma = prismaClient;
  }

  async findAllMember(filter = {}, page = 1) {
    try {
      const whereCondition = {};

      Object.keys(filter).forEach((key) => {
        whereCondition[key] = filter[key];
      });

      const members = await this.prisma.member.findMany({
        where: whereCondition,
        orderBy: {
          created_at: "desc",
        },
        skip: (page - 1) * 10,
        take: 10,
      });

      return members;
    } catch (error) {
      throw error;
    }
  }

  async getDetailMember(memberId) {
    try {
      const member = await this.prisma.member.findUnique({
        where: {
          id: memberId,
        },
        include: {
          books: {
            include: {
              book: true,
            },
          },
        },
      });
      return member;
    } catch (error) {
      // console.log(error);
    }
  }

  async createMember(newMember) {
    try {
      const createMember = await this.prisma.member.create({
        data: newMember,
        select: {
          id: true,
          code: true,
          name: true,
          penalize: true,
          penalizeUntil: true,
        },
      });

      return createMember;
    } catch (error) {
      throw error;
    }
  }
}

export default MemberRepository;
