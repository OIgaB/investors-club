import "dotenv/config";
import express from "express";

const app = express();
const port = process.env.BACK_PORT || 3000;

app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
