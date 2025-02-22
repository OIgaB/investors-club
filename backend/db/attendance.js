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
