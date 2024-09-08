import express from "express";

const router = express.Router();

const apiRoute = (bookController, memberController, loanController) => {
  //  books route
  router.get("/books", (req, res, next) =>
    bookController.getAll(req, res, next)
  );
  router.post("/books", (req, res, next) =>
    bookController.createBook(req, res, next)
  );
  router.delete("/books/:id", (req, res, next) =>
    bookController.deleteBook(req, res, next)
  );

  // members route
  router.get("/members", (req, res, next) =>
    memberController.getAll(req, res, next)
  );
  router.get("/members/:id", (req, res, next) =>
    memberController.getMemberById(req, res, next)
  );
  router.post("/members", (req, res, next) =>
    memberController.createMember(req, res, next)
  );
  router.delete("/members/:id", (req, res, next) =>
    memberController.deleteMember(req, res, next)
  );

  // loan route
  router.post("/loan", (req, res, next) =>
    loanController.bookLoan(req, res, next)
  );

  return router;
};

export { apiRoute };
