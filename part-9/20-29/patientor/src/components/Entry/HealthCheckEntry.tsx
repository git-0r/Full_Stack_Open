import { HealthAndSafety } from "@mui/icons-material";
import { Card } from "@mui/material";
import { Diagnosis, Entry } from "../../types";

interface Props {
  entry: Entry;
  diagnosis: Diagnosis[];
}

const HealthCheckEntry = ({ entry, diagnosis }: Props) => {
  return (
    <Card variant="outlined" sx={{ p: 2, m: 2 }}>
      <p>
        {entry.date} <HealthAndSafety />
      </p>
      <p>{entry.description}</p>
      <ul>
        {entry.diagnosisCodes?.map((code) => (
          <li key={code}>
            {code}: {diagnosis?.find((d) => d.code === code)?.name}
          </li>
        ))}
      </ul>
      {entry.specialist && <p>Diagnose by {entry.specialist}</p>}
    </Card>
  );
};

export default HealthCheckEntry;
