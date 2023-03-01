import express from "express";
import { getDiagnosis } from "../services/diagnosisService";
const router = express.Router();

router.get("/", (_req, res) => {
  res.json(getDiagnosis());
});

export default router;
