const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getDiaries = async () => {
  const res = await fetch(BASE_URL + "/api/diaries");
  if (res.ok) {
    return await res.json();
  }
  throw new Error(`Something went wrong: ${res.statusText}`);
};

export const addEntry = async (data: unknown) => {
  const res = await fetch(BASE_URL + "/api/diaries", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (res.ok) {
    return await res.json();
  }
  const error = await res.text();
  throw new Error(error);
};
