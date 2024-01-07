import { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import { LoanService } from "../services/loan.services";

export class LoanController {
  private loanService: LoanService;

  constructor() {
    this.loanService = new LoanService();
  }

  borrowBook = async (req: Request, res: Response): Promise<any> => {
    const userId = parseInt(req.params.userId);
    const bookId = parseInt(req.params.bookId);

    await Promise.all([
      check("userId").isInt().run(req),
      check("bookId").isInt().run(req),
    ]);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const loan = await this.loanService.borrowBook(userId, bookId);
      res.status(200).json(loan);
    } catch (error) {
      res.status(500).json({ error });
    }
  };

  returnAndRateBook = async (req: Request, res: Response): Promise<any> => {
    const userId = parseInt(req.params.userId);
    const bookId = parseInt(req.params.bookId);
    const rating = parseInt(req.body.rating);

    try {
      await Promise.all([
        check("userId").isInt().run(req),
        check("bookId").isInt().run(req),
      ]);

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      await this.loanService.returnAndRateBook(userId, bookId, rating);
      res.status(200).json({
        success: true,
        message: "Book returned and rated successfully.",
      });
    } catch (error) {
      res.status(500).json({ success: false, error });
    }
  };
}
