import { Router, Request, Response } from "express";
import storage from "node-persist";

export const birthdayRoute = Router();

birthdayRoute.get("/", async (req: Request, res: Response) => {
  const data = await storage.getItem("birthday");
  if (!data) {
    res.status(404).send({ message: "Birthday not found" });
  } else {
    res.status(200).send({ message: "Birthday found", data });
  }
});

birthdayRoute.post("/", async (req: Request, res: Response) => {
  const { birthday } = req.body;
  await storage.setItem("birthday", birthday);
  res.status(201).send({ message: "Birthday created", data: birthday });
});
