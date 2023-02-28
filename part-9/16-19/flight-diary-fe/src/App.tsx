import { useEffect, useState } from "react";
import Form from "./components/Form";
import { getDiaries } from "./services/diaryService";
import { DiaryEntry } from "./types";

function App() {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    getDiaries().then((data: DiaryEntry[]) => setDiaryEntries(data));
  }, []);

  return (
    <div className="App">
      <h1>Add New Entry</h1>
      <Form setDiaryEntries={setDiaryEntries} />
      <h2>Dairy Entries</h2>
      {diaryEntries.map(({ id, date, visibility, weather }: DiaryEntry) => (
        <div key={id}>
          <p style={{ fontWeight: 700, fontSize: "1.2rem" }}>{date}</p>
          <p>visibility: {visibility}</p>
          <p>weather: {weather}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
