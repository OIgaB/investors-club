import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

export const selectAttendance = async () => {
  try {
    const query = `
      SELECT bl.lunch_date, cm.name, cm.surname, a.status
      FROM attendance a
      JOIN club_members cm ON a.member_id = cm.id
      JOIN business_lunches bl ON a.lunch_id = bl.id
      ORDER BY bl.lunch_date;
    `;
    // const result = await pool.query(query);
    // res.json(result.rows);
    const { rows } = await pool.query(query);
    return rows
  } catch (err) {
    console.error(err)
    // throw err
    console.error(err);
    res.status(500).json({ error: "Database connection failed" });
  }
}

export const selectAttendanceById = async (id) => {
  try {
    const query = `
      SELECT bl.lunch_date, cm.name, cm.surname, a.status
      FROM attendance a
      JOIN club_members cm ON a.member_id = cm.id
      JOIN business_lunches bl ON a.lunch_id = bl.id
      WHERE a.id = $1;
    `;

    const { rows } = await pool.query(query, [id]);
    return rows
  } catch (err) {
    console.error(err)
    // throw err
    console.error(err);
    res.status(500).json({ error: "Database connection failed" });
  }
}

export const selectAttendanceByMemberId = async (id) => {
  try {
    const query = `
      SELECT bl.lunch_date, cm.name, cm.surname, a.status
      FROM attendance a
      JOIN club_members cm ON a.member_id = cm.id
      JOIN business_lunches bl ON a.lunch_id = bl.id
      WHERE cm.id = $1
      ORDER BY bl.lunch_date;
    `;

    const { rows } = await pool.query(query, [id]);
    return rows;
  } catch (err) {
    console.error(err);
    // throw err
    console.error(err);
    res.status(500).json({ error: "Database connection failed" });
  }
};

export const selectAttendanceByDateId = async (id) => {
  try {
    const query = `
      SELECT bl.lunch_date, cm.name, cm.surname, a.status
      FROM attendance a
      JOIN club_members cm ON a.member_id = cm.id
      JOIN business_lunches bl ON a.lunch_id = bl.id
      WHERE bl.id = $1;
    `;

    const { rows } = await pool.query(query, [id]);
    return rows;
  } catch (err) {
    console.error(err);
    // throw err
    console.error(err);
    res.status(500).json({ error: "Database connection failed" });
  }
};

export const selectAttendanceByStatus = async (status) => {
  try {
    const query = `
      SELECT bl.lunch_date, cm.name, cm.surname, a.status
      FROM attendance a
      JOIN club_members cm ON a.member_id = cm.id
      JOIN business_lunches bl ON a.lunch_id = bl.id
      WHERE a.status = $1
      ORDER BY bl.lunch_date;
    `;

    const { rows } = await pool.query(query, [status === "true"]);
    return rows;
  } catch (err) {
    console.error(err);
    // throw err
    console.error(err);
    res.status(500).json({ error: "Database connection failed" });
  }
};

export const selectAttendanceByStatusAndDateId = async (lunch_id, status) => {
  try {
    const query = `
      SELECT bl.lunch_date, cm.name, cm.surname, a.status
      FROM attendance a
      JOIN club_members cm ON a.member_id = cm.id
      JOIN business_lunches bl ON a.lunch_id = bl.id
      WHERE bl.id = $1 AND a.status = $2
      ORDER BY bl.lunch_date;
    `;

    const { rows } = await pool.query(query, [lunch_id, status === "true"]);
    return rows;
  } catch (err) {
    console.error(err);
    // throw err
    console.error(err);
    res.status(500).json({ error: "Database connection failed" });
  }
};

export const createAttendance = async (data) => {
  try {
    const { member_id, lunch_id, status } = data;

    const query = `
      INSERT INTO attendance (member_id, lunch_id, status)
      VALUES ($1, $2, $3) RETURNING *;
    `;

    const values = [member_id, lunch_id, status];

    // const result = await pool.query(query, values);
    // res.json({ message: "Attendance added successfully", attendance: result.rows[0] });
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

export const updateAttendanceById = async (id, body) => {
  const { member_id, lunch_id, status } = body;
  try {
    const query = `
      UPDATE attendance
      SET member_id = $2, 
      lunch_id = $3, 
      status = $4
      WHERE id = $1
      RETURNING *;
    `;

    const memberValues = [
      id,
      member_id,
      lunch_id,
      status
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

export const updateAttendanceFields = async (id, body) => {
  try {
    const fields = Object.keys(body).map((key, index) => `${key} = $${index + 2}`).join(", ");
    const query = `
      UPDATE attendance
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

export const deleteAttendanceById = async (id) => {
  try {
    const query = `
      DELETE FROM attendance  
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
