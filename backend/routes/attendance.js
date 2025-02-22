import express from "express";
import { getAttendance } from "../controllers/attendance.js";

const router = express.Router();

router.get("/", getAttendance);

export const attendanceRouter = router;
