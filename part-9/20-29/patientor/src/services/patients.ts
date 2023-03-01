import axios from "axios";
import { Entry, newEntry, Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);

  return data;
};

const getPatient = async (id: string) => {
  const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
  return data;
};

const addEntry = async (body: newEntry, id: string) => {
  const { data } = await axios.post<Entry>(
    `${apiBaseUrl}/patients/${id}/entries`,
    body,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return data;
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll,
  create,
  getPatient,
  addEntry,
};
