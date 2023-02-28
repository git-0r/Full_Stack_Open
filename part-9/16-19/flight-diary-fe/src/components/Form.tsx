import { SyntheticEvent, useState, Dispatch, SetStateAction } from "react";
import { addEntry } from "../services/diaryService";
import { DiaryEntry } from "../types";

interface Props {
  setDiaryEntries: Dispatch<SetStateAction<DiaryEntry[]>>;
}

const Form = ({ setDiaryEntries }: Props) => {
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState("");
  const [weather, setWeather] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    try {
      const newEntry = await addEntry({ date, visibility, weather, comment });
      setDiaryEntries((prev) => [newEntry, ...prev]);
      setError("");
    } catch (error: unknown) {
      if (error instanceof Error) setError(error.message);
    }
  };

  const handleVisibilitySelection = (event: SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    setVisibility(target.value);
  };

  const handleWeatherSelection = (event: SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    setWeather(target.value);
  };

  return (
    <>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", maxWidth: "360px" }}
      >
        <label htmlFor="date">Date </label>
        <input
          type="date"
          id="date"
          placeholder="enter date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <fieldset>
          <legend>Visibility</legend>
          <div>
            <input
              type="radio"
              id="great"
              name="visibility"
              value="great"
              onChange={handleVisibilitySelection}
            />
            <label htmlFor="great">Great</label>

            <input
              type="radio"
              id="good"
              name="visibility"
              value="good"
              onChange={handleVisibilitySelection}
            />
            <label htmlFor="good">Good</label>

            <input
              type="radio"
              id="ok"
              name="visibility"
              value="ok"
              onChange={handleVisibilitySelection}
            />
            <label htmlFor="ok">Ok</label>

            <input
              type="radio"
              id="poor"
              name="visibility"
              value="poor"
              onChange={handleVisibilitySelection}
            />
            <label htmlFor="poor">Poor</label>
          </div>
        </fieldset>

        <fieldset>
          <legend>Weather</legend>
          <div>
            <input
              type="radio"
              id="sunny"
              name="weather"
              value="sunny"
              onChange={handleWeatherSelection}
            />
            <label htmlFor="sunny">Sunny</label>

            <input
              type="radio"
              id="cloudy"
              name="weather"
              value="cloudy"
              onChange={handleWeatherSelection}
            />
            <label htmlFor="cloudy">Cloudy</label>

            <input
              type="radio"
              id="rainy"
              name="weather"
              value="rainy"
              onChange={handleWeatherSelection}
            />
            <label htmlFor="rainy">Rainy</label>

            <input
              type="radio"
              id="stormy"
              name="weather"
              value="stormy"
              onChange={handleWeatherSelection}
            />
            <label htmlFor="stormy">Stormy</label>

            <input
              type="radio"
              id="windy"
              name="weather"
              value="windy"
              onChange={handleWeatherSelection}
            />
            <label htmlFor="windy">Windy</label>
          </div>
        </fieldset>
        <label htmlFor="comment">comment </label>
        <input
          type="text"
          id="comment"
          placeholder="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    </>
  );
};
export default Form;
