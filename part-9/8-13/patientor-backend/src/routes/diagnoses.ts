import express from "express";
import { getDiagnoses } from "../services/diagnosesService";
const router = express.Router();

router.get("/", (_req, res) => {
  res.json(getDiagnoses());
});

export default router;
