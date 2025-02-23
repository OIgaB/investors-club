import {
  createAttendance,
  deleteAttendanceById,
  selectAttendance,
  selectAttendanceByDateId,
  selectAttendanceById,
  selectAttendanceByMemberId,
  selectAttendanceByStatus,
  selectAttendanceByStatusAndDateId,
  updateAttendanceById,
  updateAttendanceFields,
} from "../db/attendance.js";

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

export const getAttendanceById = async (req, res) => {
  try {
    const { id } = req.params;
    const attendance = await selectAttendanceById(id);

    if (!attendance) {
      res.status(404).json({ message: "Attendance not found" });
      return;
    }
    res.json(attendance);
  } catch (error) {
    console.error(error);
    return res.status(400).json(error);
  }
};

export const getAttendanceByMember = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await selectAttendanceByMemberId(id);
    // res.status(200).json(PropertiesSchema.parse(data))
    res.status(200).json(data);
    return data;
  } catch (error) {
    console.error(error);
    return res.status(400).json(error);
  }
};

export const getAttendanceByDate = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await selectAttendanceByDateId(id);
    // res.status(200).json(PropertiesSchema.parse(data))
    res.status(200).json(data);
    return data;
  } catch (error) {
    console.error(error);
    return res.status(400).json(error);
  }
};

export const getAttendanceByStatus = async (req, res) => {
  try {
    const { status } = req.params;

    const data = await selectAttendanceByStatus(status);
    // res.status(200).json(PropertiesSchema.parse(data))
    res.status(200).json(data);
    return data;
  } catch (error) {
    console.error(error);
    return res.status(400).json(error);
  }
};

export const getAttendanceByStatusAndDate = async (req, res) => {
  try {
    const { lunch_id, status } = req.params;

    const data = await selectAttendanceByStatusAndDateId(lunch_id, status);
    // res.status(200).json(PropertiesSchema.parse(data))
    res.status(200).json(data);
    return data;
  } catch (error) {
    console.error(error);
    return res.status(400).json(error);
  }
};

export const postAttendance = async (req, res) => {
  try {
    const newLunch = await createAttendance(req.body);
    res.status(200).json(newLunch);

    return newLunch;
  } catch (error) {
    console.error(error);
    return res.status(400).json(error);
  }
};

export const putAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    const attendance = await updateAttendanceById(id, req.body);

    if (!attendance) {
      res.status(404).json({ message: "Attendance not found" });
      return;
    }
    res.json(attendance);
  } catch (error) {
    console.error(error);
    return res.status(400).json(error);
  }
};

export const patchAttendance = async (req, res) => {
  try {
    const { id } = req.params;

    if (!Object.keys(req.body).length) {
      return res.status(400).json({ message: "No fields provided for update" });
    }

    const attendance = await updateAttendanceFields(id, req.body);

    if (!attendance) {
      return res.status(404).json({ message: "Attendance  not found" });
    }

    res.json(attendance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error while updating attendance" });
  }
};

export const deleteAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    const attendance = await deleteAttendanceById(id);

    if (!attendance) {
      res.status(404).json({ message: "Attendance not found" });
      return;
    }
    res.json(attendance);
    // res.status(204).end()
  } catch (error) {
    console.error(error);
    return res.status(400).json(error);
  }
};
