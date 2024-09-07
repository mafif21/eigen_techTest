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
      const result = await this.memberRepository.findAllMember(filter, page);
      return result;
    } catch (error) {
      throw new ResponseError(500, "INTERNAL SERVER ERROR");
    }
  }

  async getDetailMember(memberId) {
    try {
      const result = await this.memberRepository.getDetailMember(memberId);
      if (result == null) {
        throw new ResponseError(404, "data not found");
      }

      return result;
    } catch (error) {
      throw new ResponseError(404, error.message);
    }
  }

  async create(newMemberRequest) {
    try {
      const newMember = validate(createMemberValidation, newMemberRequest);
      const result = await this.memberRepository.createMember(newMember);
      return result;
    } catch (error) {
      throw new ResponseError(400, error.message);
    }
  }

  async delete(memberId) {
    try {
      const member = await this.memberRepository.getDetailMember(memberId);
      console.log(member);
      if (!member) {
        throw new ResponseError(404, "data not found");
      }

      const remove = await this.memberRepository.delete(member.id);
      return remove;
    } catch (error) {
      throw new ResponseError(400, error.message);
    }
  }
}

export default MemberService;
