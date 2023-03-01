import patientsData from "../data/patients";
import { newPatientEntry, Patient, PatientSafe } from "../types";
import { v4 as uuidv4 } from "uuid";

const getPatients = (): PatientSafe[] => {
  return patientsData.map(({ id, name, dateOfBirth, occupation, gender }) => ({
    id,
    name,
    dateOfBirth,
    occupation,
    gender,
  }));
};

const addPatient = (entry: newPatientEntry): Patient => {
  const id = uuidv4();

  const newPatient = {
    ...entry,
    id,
    entries: [],
  };
  patientsData.push(newPatient);
  return newPatient;
};

const getPatient = (id: string): Patient | undefined => {
  return patientsData.find((patient) => patient.id === id);
};

export { getPatients, addPatient, getPatient };
