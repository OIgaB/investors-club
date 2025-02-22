import express from "express";
import { getLunches } from "../controllers/lunches.js";

const router = express.Router();

router.get("/", getLunches);

export const lunchesRouter = router;
