import {
  BaseEntry,
  Diagnosis,
  Entry,
  EntryType,
  Gender,
  HealthCheckRating,
  HospitalEntry,
  newEntry,
  newPatientEntry,
} from "./src/types";

const toNewPatientEntry = (object: unknown): newPatientEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object
  ) {
    const newPatient: newPatientEntry = {
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
    };
    if ("entries" in object) newPatient.entries = parseEntries(object.entries);
    else newPatient.entries = [];
    return newPatient;
  }
  throw new Error("Incorrect data: some fields are missing");
};

const parseEntries = (entries: unknown): Entry[] => {
  if (!isArray(entries) || !isEntriesValid(entries)) {
    throw new Error("Incorrect or missing entries");
  }
  return entries;
};

const isEntriesValid = (entries: Entry[]): entries is Entry[] => {
  return entries.every(
    (entry: Entry) =>
      entry.type &&
      (entry.type === "HealthCheck" ||
        entry.type === "OccupationalHealthcare" ||
        entry.type === "Hospital")
  );
};

const isArray = (array: unknown): array is [] => {
  return Array.isArray(array);
};

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error("Incorrect or missing name");
  }
  return name;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error("Incorrect or missing occupation");
  }
  return occupation;
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error("Incorrect or missing date of birth: " + dateOfBirth);
  }
  return dateOfBirth;
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn)) {
    throw new Error("Incorrect of missing ssn");
  }
  return ssn;
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender);
  }
  return gender;
};

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

const toNewEntry = (object: unknown): newEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "description" in object &&
    "date" in object &&
    "specialist" in object &&
    "type" in object
  ) {
    const baseEntry: Omit<BaseEntry, "id"> = {
      description: parseDescription(object.description),
      date: parseDate(object.date),
      specialist: parseSpecialist(object.specialist),
    };

    if ("diagnosisCodes" in object) {
      baseEntry.diagnosisCodes = parseDiagnosisCodes(object.diagnosisCodes);
    }

    const type = parseType(object.type);

    switch (type) {
      case "HealthCheck":
        if ("healthCheckRating" in object) {
          return {
            ...baseEntry,
            type: "HealthCheck",
            healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
          };
        }
        throw new Error("Incorrect or missing healthCheckRating");
      case "Hospital":
        if ("discharge" in object) {
          return {
            ...baseEntry,
            type: "Hospital",
            discharge: parseDischargeInfo(object.discharge),
          };
        }
        throw new Error("Incorrect or missing discharge info");
      case "OccupationalHealthcare":
        if ("employerName" in object) {
          return {
            ...baseEntry,
            type: "OccupationalHealthcare",
            employerName: parseEmployerName(object.employerName),
          };
        }
        throw new Error("Incorrect or missing employer name");
      default:
        assertNever(type);
    }
  }
  throw new Error("Incorrect data: some fields are missing");
};

const parseDescription = (description: unknown): string => {
  if (!isString(description)) {
    throw new Error("Incorrect of missing description: " + description);
  }
  return description;
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }
  return date;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!isString(specialist)) {
    throw new Error("Incorrect of missing description: " + specialist);
  }
  return specialist;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis["code"]> => {
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis["code"]>;
  }

  return object.diagnosisCodes as Array<Diagnosis["code"]>;
};

const parseType = (type: unknown): Entry["type"] => {
  if (!isString(type) || !isEntry(type)) {
    throw new Error("Incorrect or missing entry type: " + type);
  }
  return type;
};

const isEntry = (type: string): type is Entry["type"] => {
  return Object.values(EntryType)
    .map((e) => e.toString())
    .includes(type);
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (!isNumber(rating) || !isRating(rating)) {
    throw new Error("Incorrect or missing rating: " + rating);
  }
  return rating;
};

const isNumber = (rating: unknown): rating is number => {
  return typeof rating === "number" || rating instanceof Number;
};

const isRating = (rating: number): rating is HealthCheckRating => {
  return Object.values(HealthCheckRating)
    .map((v) => Number(v))
    .includes(rating);
};

const parseEmployerName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error("Incorrect or missing name: " + name);
  }
  return name;
};

const parseDischargeInfo = (data: unknown): HospitalEntry["discharge"] => {
  if (!data || typeof data !== "object" || !isValidDischarge(data)) {
    throw new Error("Invalid discharge data: " + JSON.stringify(data));
  }

  return data;
};

const isValidDischarge = (data: object): data is HospitalEntry["discharge"] => {
  return (
    "date" in data &&
    isString(data.date) &&
    isDate(data.date) &&
    "criteria" in data &&
    isString(data.criteria)
  );
};

export { toNewPatientEntry, toNewEntry };
