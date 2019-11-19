import express from "express";
import dotenv from "dotenv";

import routes from "./api/routes";

const app = express();
dotenv.config();
const port = process.env.PORT;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
routes(app);

app.get("/", (req, res) => {
  res.json({ msg: "Index Route" });
});

app.listen(port, () => {
  console.log(`Server is listening on Port ${port}`);
});
