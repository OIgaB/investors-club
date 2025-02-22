import { selectLunches } from "../db/lunches.js";


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
