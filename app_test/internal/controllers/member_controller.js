class MemberController {
  constructor(memberService) {
    this.memberService = memberService;
  }

  async getAll(req, res, next) {
    try {
      const page = req.params.page;
      const result = await this.memberService.getAllMember(page);
      res.status(200).json({
        status: 200,
        message: "success get all members",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async getMemberById(req, res, next) {
    try {
      const memberId = req.params.id;
      const result = await this.memberService.getDetailMember(memberId);
      result.books = result.books.length;
      res.status(200).json({
        status: 200,
        message: `success get member with id ${memberId}`,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async createMember(req, res, next) {
    try {
      const request = req.body;
      const result = await this.memberService.create(request);
      res.status(201).json({
        status: 201,
        message: "success create new members",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default MemberController;
