import { Diagnosis, Entry } from "../../types";
import HealthCheckEntry from "./HealthCheckEntry";
import HospitalEntry from "./HospitalEntry";
import OccupationalHealthcareEntry from "./OccupationalHealthcareEntry";

interface Props {
  entry: Entry;
  diagnosis: Diagnosis[];
}

const Index = ({ entry, diagnosis }: Props) => {
  switch (entry.type) {
    case "HealthCheck":
      return <HealthCheckEntry entry={entry} diagnosis={diagnosis} />;
    case "Hospital":
      return <HospitalEntry entry={entry} diagnosis={diagnosis} />;
    case "OccupationalHealthcare":
      return (
        <OccupationalHealthcareEntry entry={entry} diagnosis={diagnosis} />
      );
    default:
      return assertNever(entry);
  }
};

export default Index;

const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member.`);
};
