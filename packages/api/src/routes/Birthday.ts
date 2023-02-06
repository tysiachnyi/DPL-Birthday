import { PostRequestData } from "./../types/birthday";
import { Router, Request, Response } from "express";
import storage from "node-persist";
import { GetResponseData } from "../types/birthday";

export const birthdayRoute = Router();

birthdayRoute.get("/", async (req: Request, res: Response) => {
  const data: GetResponseData = await storage.getItem("birthday");
  if (!data) {
    res.status(404).json({ message: "Birthday not found" });
  } else {
    res.status(200).json({ message: "Birthday found", data });
  }
});

birthdayRoute.post("/", async (req: Request, res: Response) => {
  const { birthday }: PostRequestData = req.body;
  await storage.setItem("birthday", birthday);
  res.status(201).json({ message: "Birthday created", data: birthday });
});
