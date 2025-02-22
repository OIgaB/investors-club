import "dotenv/config";
import express from "express";

import { membersRouter } from "./routes/members.js";
import { lunchesRouter } from "./routes/lunches.js";
import { attendanceRouter } from "./routes/attendance.js";

const app = express();
const port = process.env.BACK_PORT || 3000;

app.use(express.json());

app.use("/api/members", membersRouter);
app.use("/api/lunches", lunchesRouter);
app.use("/api/attendance", attendanceRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
