import { useEffect, useState } from "react";
import { Diagnosis, Gender, Patient } from "../../types";
import patientService from "../../services/patients";
import { useParams } from "react-router-dom";
import { AxiosError } from "axios";
import { Female, Male } from "@mui/icons-material";
import { getDiagnosis } from "../../services/diagnosis";
import Entry from "../Entry";
import Form from "../Form";

const PatientPage = () => {
  const [patient, setPatient] = useState<Patient>({
    id: "",
    name: "",
    occupation: "",
    gender: Gender["Male"],
    entries: [],
  });
  const [diagnosis, setDiagnosis] = useState<Diagnosis[]>([]);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getDiagnosis().then((data) => setDiagnosis(data));
      patientService
        .getPatient(id)
        .then((data) => setPatient(data))
        .catch((error) => {
          if (error instanceof AxiosError) alert(error.response?.data);
        });
    }
  }, [id]);

  return (
    <div>
      <p>
        <span style={{ fontWeight: 700, fontSize: "1.2rem" }}>
          {patient?.name}
        </span>
        {patient?.gender === "female" ? (
          <Female />
        ) : patient?.gender === "male" ? (
          <Male />
        ) : (
          ""
        )}
      </p>
      <p>ssn: {patient?.ssn}</p>
      <p>occupation: {patient?.occupation}</p>

      {!!patient.id && <Form id={id} setPatient={setPatient} />}
      <div>
        <h2>Entries</h2>
        {patient?.entries?.map((entry) => (
          <Entry key={entry.id} diagnosis={diagnosis} entry={entry} />
        ))}
      </div>
    </div>
  );
};
export default PatientPage;
