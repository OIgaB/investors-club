import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

export const selectMembers = async () => {
  try {
    const query = `
      SELECT * FROM club_members;
    `;
    // const result = await pool.query(query);
    // res.json(result.rows);
    const { rows } = await pool.query(query);
    return rows;
  } catch (err) {
    console.error(err);
    // throw err
    console.error(err);
    res.status(500).json({ error: "Database connection failed" });
  }
};

export const selectMemberById = async (id) => {
  try {
    const query = `
      SELECT * FROM club_members WHERE id = $1;
    `;
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  } catch (err) {
    console.error(err);
    // throw err
    console.error(err);
    res.status(500).json({ error: "Database connection failed" });
  }
};

export const createMember = async (data) => {
  try {
    const { name, surname, title, enterprise, email, phone_number } = data;

    const query = `
      INSERT INTO club_members (name, surname, title, enterprise, email, phone_number)
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;
    `;

    const values = [name, surname, title, enterprise, email, phone_number];

    // const result = await pool.query(query, values);
    // res.json({ message: "Member added successfully", member: result.rows[0] });
    const { rows } = await pool.query(query, values);
    const [item] = rows;
    return item;
  } catch (err) {
    console.error(err);
    // throw err
    console.error(err);
    res.status(500).json({ error: "Database connection failed" });
  }
};

export const updateMemberById = async (id, body) => {
  const { name, surname, title, enterprise, email, phone_number } = body;
  try {
    const query = `
      UPDATE club_members
      SET name = $2, 
      surname = $3, 
      title = $4,
      enterprise = $5,
      email = $6, 
      phone_number = $7
      WHERE id = $1
      RETURNING *;
    `;

    const memberValues = [
      id,
      name,
      surname,
      title,
      enterprise,
      email,
      phone_number,
    ];

    const { rows } = await pool.query(query, memberValues);
    return rows[0];
  } catch (err) {
    console.error(err);
    // throw err
    console.error(err);
    res.status(500).json({ error: "Database connection failed" });
  }
};

export const updateMemberFields = async (id, body) => {
  try {
    const fields = Object.keys(body).map((key, index) => `${key} = $${index + 2}`).join(", ");
    const query = `
      UPDATE club_members
      SET ${fields}
      WHERE id = $1
      RETURNING *;
    `;

    const values = Object.values(body);
    values.unshift(id);

    const { rows } = await pool.query(query, values);
    return rows[0];
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const deleteMemberById = async (id) => {
  try {
    const query = `
      DELETE FROM club_members  
      WHERE id = $1
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  } catch (err) {
    console.error(err);
    // throw err
    console.error(err);
    res.status(500).json({ error: "Database connection failed" });
  }
};
