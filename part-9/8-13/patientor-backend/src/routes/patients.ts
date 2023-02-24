import express from "express";
import { toNewPatientEntry } from "../../utils";
import { getPatients, addPatient } from "../services/patientsService";
const router = express.Router();

router.get("/", (_req, res) => {
  res.json(getPatients());
});

router.post("/", (_req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(_req.body);
    const addedPatient = addPatient(newPatientEntry);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
