import { CoursePart } from "../types";

interface Props {
  coursePart: CoursePart;
}

const Part = ({ coursePart }: Props) => {
  switch (coursePart.kind) {
    case "basic":
      return (
        <div>
          <p>
            {coursePart.name} {coursePart.exerciseCount}
          </p>
          <p>{coursePart.description}</p>
        </div>
      );
    case "group":
      return (
        <div>
          <p>
            {coursePart.name} {coursePart.exerciseCount}
          </p>
          <p>group project count: {coursePart.groupProjectCount}</p>
        </div>
      );
    case "background":
      return (
        <div>
          <p>
            {coursePart.name} {coursePart.exerciseCount}
          </p>
          <p>{coursePart.description}</p>
          <p>background material: {coursePart.backroundMaterial}</p>
        </div>
      );
    case "special":
      return (
        <div>
          <p>
            {coursePart.name} {coursePart.exerciseCount}
          </p>
          <p>{coursePart.description}</p>
          <p>
            required skills:{" "}
            {coursePart.requirements.map((req) => (
              <span key={req}>{req}, </span>
            ))}
          </p>
        </div>
      );
    default:
      return assertNever(coursePart);
  }
};
export default Part;

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};
