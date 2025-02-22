import { selectAttendance } from "../db/attendance.js";

export const getAttendance = async (req, res) => {
  try {
    const data = await selectAttendance();
    // res.status(200).json(PropertiesSchema.parse(data))
    res.status(200).json(data);
    return data;
  } catch (error) {
    console.error(error);
    return res.status(400).json(error);
  }
};
