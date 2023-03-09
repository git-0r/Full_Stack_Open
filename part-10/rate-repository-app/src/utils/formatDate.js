export const formatDate = (date = "2023-03-06T01:31:29.794Z") => {
  const d = new Date(Date.parse(date));
  return `${d.getDate()}.${d.getMonth()}.${d.getFullYear()}`;
};
