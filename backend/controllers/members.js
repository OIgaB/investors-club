import {
  createMember,
  deleteMemberById,
  selectMemberById,
  selectMembers,
  updateMemberById,
  updateMemberFields,
} from "../db/members.js";

export const getMembers = async (req, res) => {
  try {
    const data = await selectMembers();
    // res.status(200).json(PropertiesSchema.parse(data))
    res.status(200).json(data);
    return data;
  } catch (error) {
    console.error(error);
    return res.status(400).json(error);
  }
};

export const getMemberById = async (req, res) => {
  try {
    const { id } = req.params;
    const member = await selectMemberById(id);

    if (!member) {
      res.status(404).json({ message: "Member not found" });
      return;
    }
    res.json(member);
  } catch (error) {
    console.error(error);
    return res.status(400).json(error);
  }
};

export const postMember = async (req, res) => {
  try {
    const newMember = await createMember(req.body);
    res.status(200).json(newMember);

    return newMember;
  } catch (error) {
    console.error(error);
    return res.status(400).json(error);
  }
};

export const putMember = async (req, res) => {
  try {
    const { id } = req.params;
    const member = await updateMemberById(id, req.body);

    if (!member) {
      res.status(404).json({ message: "Member not found" });
      return;
    }
    res.json(member);
  } catch (error) {
    console.error(error);
    return res.status(400).json(error);
  }
};

export const patchMember = async (req, res) => {
  try {
    const { id } = req.params;

    if (!Object.keys(req.body).length) {
      return res.status(400).json({ message: "No fields provided for update" });
    }

    const member = await updateMemberFields(id, req.body);

    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    res.json(member);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error while updating member" });
  }
};

export const deleteMember = async (req, res) => {
  try {
    const { id } = req.params;
    const member = await deleteMemberById(id);

    if (!member) {
      res.status(404).json({ message: "Member not found" });
      return;
    }
    res.json(member);
    // res.status(204).end()
  } catch (error) {
    console.error(error);
    return res.status(400).json(error);
  }
};
