import express from "express";
import {
  deleteMember,
  getMemberById,
  getMembers,
  patchMember,
  postMember,
  putMember,
} from "../controllers/members.js";

const router = express.Router();

router.get("/", getMembers);
router.get("/:id", getMemberById);
router.post("/", postMember);
router.put("/:id", putMember);
router.patch("/:id", patchMember);
router.delete("/:id", deleteMember);

export const membersRouter = router;
