import express from "express";
import {
  deleteAttendance,
  getAttendance,
  getAttendanceByDate,
  getAttendanceById,
  getAttendanceByMember,
  getAttendanceByStatus,
  getAttendanceByStatusAndDate,
  patchAttendance,
  postAttendance,
  putAttendance,
} from "../controllers/attendance.js";

const router = express.Router();

router.get("/", getAttendance);
router.get("/:id", getAttendanceById);
router.get("/member/:id", getAttendanceByMember);
router.get("/date/:id", getAttendanceByDate);
router.get("/status/:status", getAttendanceByStatus);
router.get("/date/:lunch_id/status/:status", getAttendanceByStatusAndDate);
router.post("/", postAttendance);
router.put("/:id", putAttendance);
router.patch("/:id", patchAttendance);
router.delete("/:id", deleteAttendance);

export const attendanceRouter = router;
