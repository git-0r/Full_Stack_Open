export const FormatNumber = (num) => {
  if (num >= 10000) return FormatNumber(num / 1000).toPrecision(3) / 1 + "K";

  if (num >= 1000) return (num / 1000).toPrecision(2) / 1 + "K";

  return num;
};
