import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  TextField,
  Theme,
  useTheme,
} from "@mui/material";
import { useState, Dispatch, SetStateAction } from "react";
import {
  BaseEntry,
  Entry,
  HealthCheckRating,
  newEntry,
  Patient,
} from "../../types";
import PatientService from "../../services/patients";

interface Props {
  id?: string;
  setPatient?: Dispatch<SetStateAction<Patient>>;
}

const Form = ({ id, setPatient }: Props) => {
  const [type, setType] = useState<Entry["type"]>("HealthCheck");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [code, setCode] = useState<string[]>([]);
  const [healthCheckRating, setHealthCheckRating] =
    useState<HealthCheckRating>(0);
  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStart, setSickLeaveStart] = useState("");
  const [sickLeaveEnd, setSickLeaveEnd] = useState("");
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");
  const theme = useTheme();

  if (!id || !setPatient) {
    throw new Error("Incorrect or missing id");
  }

  const handleType = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement).value as Entry["type"];
    setType(value);
  };
  const handleDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate((event.target as HTMLInputElement).value);
  };

  const handleDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement).value.trimStart();
    setDescription(value);
  };
  const handleSpecialist = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement).value.trimStart();
    setSpecialist(value);
  };

  //   handle diagnosis codes
  const handleChange = (event: SelectChangeEvent<typeof code>) => {
    const {
      target: { value },
    } = event;
    setCode(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleHCR = (event: SelectChangeEvent) => {
    const isRating = (value: number): value is HealthCheckRating => {
      return Object.values(HealthCheckRating)
        .map((v) => Number(v))
        .includes(value);
    };
    const value = Number((event.target as HTMLInputElement).value);

    isRating(value) && setHealthCheckRating(value);
  };

  const handleEmployerName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement).value.trimStart();
    setEmployerName(value);
  };

  const handleLeaveStartDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSickLeaveStart((event.target as HTMLInputElement).value);
  };

  const handleLeaveEndDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSickLeaveEnd((event.target as HTMLInputElement).value);
  };

  const handleDischargeDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDischargeDate((event.target as HTMLInputElement).value);
  };

  const handleDischargeCriteria = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = (event.target as HTMLInputElement).value.trimStart();
    setDischargeCriteria(value);
  };

  const submitEntry = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const baseEntry: Omit<BaseEntry, "id"> = {
      date,
      description,
      specialist,
      diagnosisCodes: code,
    };

    let body: newEntry;

    if (type === "HealthCheck") {
      body = {
        ...baseEntry,
        type,
        healthCheckRating: healthCheckRating,
      };
      addNewEntry(body, id);
    }
    if (type === "Hospital") {
      body = {
        ...baseEntry,
        type,
        discharge: { date: dischargeDate, criteria: dischargeCriteria },
      };
      addNewEntry(body, id);
    }
    if (type === "OccupationalHealthcare") {
      body = {
        ...baseEntry,
        type,
        employerName: employerName,
      };

      if (sickLeaveStart && sickLeaveEnd) {
        body.sickLeave = {
          startDate: sickLeaveStart,
          endDate: sickLeaveEnd,
        };
      }
      addNewEntry(body, id);
    }
  };

  const addNewEntry = async (body: newEntry, id: string) => {
    const newEntry = await PatientService.addEntry(body, id);
    setPatient((prev) => ({ ...prev, entries: [newEntry, ...prev?.entries] }));
  };

  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        justifyContent: "center",
        alignItems: "center",
        margin: "0 auto",
        border: "1px solid gray",
        padding: "1rem",
      }}
      onSubmit={submitEntry}
    >
      <FormControl>
        <FormLabel id="entry-type">Entry type</FormLabel>
        <RadioGroup
          row
          aria-labelledby="entry-type"
          name="type"
          value={type}
          onChange={handleType}
        >
          <FormControlLabel
            value="HealthCheck"
            control={<Radio />}
            label="HealthCheck"
          />
          <FormControlLabel
            value="OccupationalHealthcare"
            control={<Radio />}
            label="OccupationalHealthcare"
          />
          <FormControlLabel
            value="Hospital"
            control={<Radio />}
            label="Hospital"
          />
        </RadioGroup>
      </FormControl>
      <TextField
        id="date"
        label="Date"
        type="date"
        InputLabelProps={{
          shrink: true,
        }}
        value={date}
        onChange={handleDate}
        required
        fullWidth
      />
      <TextField
        id="description"
        label="Description"
        type="text"
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        value={description}
        onChange={handleDescription}
        required
        placeholder="description..."
      />
      <TextField
        id="specialist"
        label="Specialist"
        type="text"
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        value={specialist}
        onChange={handleSpecialist}
        required
        placeholder="specialist name..."
      />
      <FormControl fullWidth>
        <InputLabel id="diagnosis-code">Diagnosis code</InputLabel>
        <Select
          labelId="diagnosis-code"
          id="diagnosis-code"
          multiple
          value={code}
          onChange={handleChange}
          input={<OutlinedInput label="Dianosis code" />}
          MenuProps={MenuProps}
        >
          {codes.map((c) => (
            <MenuItem key={c} value={c} style={getStyles(c, code, theme)}>
              {c}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {type === "HealthCheck" && (
        <FormControl fullWidth>
          <InputLabel id="healthCheckRating">Health check rating</InputLabel>
          <Select
            labelId="healthCheckRating"
            id="healthCheckRating"
            value={healthCheckRating.toString()}
            label="healthCheckRating"
            onChange={handleHCR}
            required
          >
            <MenuItem value={0}>0</MenuItem>
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
          </Select>
        </FormControl>
      )}
      {type === "OccupationalHealthcare" && (
        <>
          <TextField
            id="employerName"
            label="Employer name"
            type="text"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            value={employerName}
            onChange={handleEmployerName}
            required
            placeholder="employer name..."
          />

          <TextField
            id="sickleavestart"
            label="Sick leave start date"
            type="date"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            value={sickLeaveStart}
            onChange={handleLeaveStartDate}
          />
          <TextField
            id="sickleaveend"
            label="Sick leave end date"
            type="date"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            value={sickLeaveEnd}
            onChange={handleLeaveEndDate}
          />
        </>
      )}

      {type === "Hospital" && (
        <>
          <TextField
            id="discharge-date"
            label="Discharge date"
            type="date"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            value={dischargeDate}
            onChange={handleDischargeDate}
            required
          />
          <TextField
            id="discharge-criteria"
            label="Discharge criteria"
            type="text"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            value={dischargeCriteria}
            onChange={handleDischargeCriteria}
            required
          />
        </>
      )}
      <Button variant="contained" type="submit" fullWidth>
        Submit
      </Button>
    </form>
  );
};

export default Form;

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, personName: string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const codes = [
  "M24.2",
  "M51.2",
  "S03.5",
  "J10.1",
  "J06.9",
  "Z57.1",
  "N30.0",
  "H54.7",
  "J03.0",
  "L60.1",
  "Z74.3",
  "L20",
  "F43.2",
  "S62.5",
  "H35.29",
];
