import express from "express";
import { toNewEntry, toNewPatientEntry } from "../../utils";
import {
  getPatients,
  addPatient,
  getPatient,
} from "../services/patientsService";
import { v4 as uuid } from "uuid";
import { Entry } from "../types";
import patientEntries from "../data/patients";

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

router.get("/:id", (_req, res) => {
  try {
    const patientId = _req.params.id;
    if (patientId) {
      const patient = getPatient(patientId);
      if (patient) {
        res.json(getPatient(patientId));
        return;
      }
      throw new Error("data not available");
    }
    throw new Error("missing or incorrect id");
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).send(error.message);
    }
  }
});

router.post("/:id/entries", (_req, res) => {
  try {
    const patientId = _req.params.id;

    // check if patient exists
    if (patientId) {
      const patient = getPatient(patientId);

      if (patient) {
        const newEntry = toNewEntry(_req.body) as Entry;
        newEntry.id = uuid();
        patientEntries.find((e) => {
          if (e.id === patientId) {
            e.entries?.push(newEntry);
            return true;
          }
          return false;
        });
        res.json(newEntry);
        return;
      }
      throw new Error("data not available");
    }
    throw new Error("missing or incorrect id");
  } catch (error) {
    if (error instanceof Error) {
      res.send(400).send(error.message);
    }
  }
});

export default router;
