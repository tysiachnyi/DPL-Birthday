import { birthdayRoute } from "./routes/Birthday";
import express from "express";
import setStorage from "./config/setStorage";
import cors from "cors";

setStorage();

const app = express();
const port = 8080;

app.use(express.json());

app.use(cors());

app.use("/api/birthday", birthdayRoute);

app.get("/", (req, res) => {
  res.send("What's up doc ?!");
});

app.listen(port, () => {
  console.log(`api listening at http://localhost:${port}`);
});
