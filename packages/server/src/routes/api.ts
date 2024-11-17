import express from "express";
import { authenticateUser } from "./auth";
import matchRouter from "./match"

const router = express.Router();

// all routes under this router require authentication
router.use(authenticateUser);

router.use("/matches", matchRouter);

export default router;