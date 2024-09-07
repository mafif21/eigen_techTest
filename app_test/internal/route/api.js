import express from "express";

const router = express.Router();

const createRouter = (bookController, memberController) => {
  router.get("/books", (req, res, next) =>
    bookController.getAll(req, res, next)
  );
  router.post("/books", (req, res, next) =>
    bookController.createBook(req, res, next)
  );

  router.get("/members", (req, res, next) =>
    memberController.getAll(req, res, next)
  );
  router.post("/members", (req, res, next) =>
    memberController.createMember(req, res, next)
  );

  return router;
};

export { createRouter };
