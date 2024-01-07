// loan.routes.ts
import express, { Router } from "express";
import { LoanController } from "../controllers/loan.controller";

const loanRouter: Router = express.Router();
const loanController = new LoanController();

loanRouter.post("/users/:userId/borrow/:bookId", loanController.borrowBook);
loanRouter.post("/users/:userId/return/:bookId", loanController.returnAndRateBook);

export default loanRouter;
