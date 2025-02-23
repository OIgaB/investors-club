import express from "express";
import { deleteLunch, getLunchById, getLunches, postLunch, putLunch } from "../controllers/lunches.js";

const router = express.Router();

router.get("/", getLunches);
router.get("/:id", getLunchById);
router.post("/", postLunch);
router.put("/:id", putLunch);
router.delete("/:id", deleteLunch);

export const lunchesRouter = router;
