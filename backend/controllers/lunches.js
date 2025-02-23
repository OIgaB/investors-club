import {
  createLunch,
  deleteLunchById,
  selectLunchById,
  selectLunches,
  updateLunchById,
} from "../db/lunches.js";

export const getLunches = async (req, res) => {
  try {
    const data = await selectLunches();
    // res.status(200).json(PropertiesSchema.parse(data))
    res.status(200).json(data);
    return data;
  } catch (error) {
    console.error(error);
    return res.status(400).json(error);
  }
};

export const getLunchById = async (req, res) => {
  try {
    const { id } = req.params;
    const lunch = await selectLunchById(id);

    if (!lunch) {
      res.status(404).json({ message: "Lunch not found" });
      return;
    }
    res.json(lunch);
  } catch (error) {
    console.error(error);
    return res.status(400).json(error);
  }
};

export const postLunch = async (req, res) => {
  try {
    const newLunch = await createLunch(req.body);
    res.status(200).json(newLunch);

    return newLunch;
  } catch (error) {
    console.error(error);
    return res.status(400).json(error);
  }
};

export const putLunch = async (req, res) => {
  try {
    const { id } = req.params;
    const lunch = await updateLunchById(id, req.body);

    if (!lunch) {
      res.status(404).json({ message: "Lunch not found" });
      return;
    }
    res.json(lunch);
  } catch (error) {
    console.error(error);
    return res.status(400).json(error);
  }
};

export const deleteLunch = async (req, res) => {
  try {
    const { id } = req.params;
    const lunch = await deleteLunchById(id);

    if (!lunch) {
      res.status(404).json({ message: "Lunch not found" });
      return;
    }
    res.json(lunch);
    // res.status(204).end()
  } catch (error) {
    console.error(error);
    return res.status(400).json(error);
  }
};
