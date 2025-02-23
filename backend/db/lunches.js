import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

export const selectLunches = async () => {
  try {
    const query = `
    SELECT * FROM business_lunches
    ORDER BY lunch_date;
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

export const selectLunchById = async (id) => {
  try {
    const query = `
      SELECT * FROM business_lunches WHERE id = $1;
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

export const createLunch = async (data) => {
  try {
    const { lunch_date } = data;

    const query = `
      INSERT INTO business_lunches (lunch_date)
      VALUES ($1) RETURNING *;
    `;

    const values = [lunch_date];

    // const result = await pool.query(query, values);
    // res.json({ message: "Lunch added successfully", lunch: result.rows[0] });
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

export const updateLunchById = async (id, body) => {
  const { lunch_date } = body;
  try {
    const query = `
      UPDATE business_lunches
      SET lunch_date = $2
      WHERE id = $1
      RETURNING *;
    `;

    const lunchValues = [
      id,
      lunch_date,
    ];

    const { rows } = await pool.query(query, lunchValues);
    return rows[0];
  } catch (err) {
    console.error(err);
    // throw err
    console.error(err);
    res.status(500).json({ error: "Database connection failed" });
  }
};

export const deleteLunchById = async (id) => {
  try {
    const query = `
      DELETE FROM business_lunches  
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
