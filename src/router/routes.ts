import express from "express";
import userRoutes from "./user";
import bookRoutes from "./book";
import loanRoutes from "./loan";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/books", bookRoutes);
router.use(loanRoutes);

export default router;
