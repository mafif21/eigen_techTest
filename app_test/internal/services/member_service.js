import { ResponseError } from "../error/response_error.js";
import { createMemberValidation } from "../validation/member_validation.js";
import { validate } from "../validation/validation.js";

class MemberService {
  constructor(memberRepository) {
    this.memberRepository = memberRepository;
  }

  async getAllMember(page = 1) {
    try {
      const filter = {};
      const members = await this.memberRepository.findAllMember(filter, page);
      return {
        members,
      };
    } catch (error) {
      throw new ResponseError(500, "INTERNAL SERVER ERROR");
    }
  }

  async getDetailMember(memberId) {
    try {
      const { id, code, name, penalize, penalizeUntil, books } =
        await this.memberRepository.getDetailMember(memberId);

      return {
        id,
        code,
        name,
        penalize,
        penalizeUntil,
        books: books.length,
      };
    } catch (error) {}
  }

  async create(newMemberRequest) {
    try {
      const newMember = validate(createMemberValidation, newMemberRequest);
      const result = await this.memberRepository.createMember(newMember);
      return result;
    } catch (error) {
      throw new ResponseError(500, "Internal Server Error");
    }
  }
}

export default MemberService;
