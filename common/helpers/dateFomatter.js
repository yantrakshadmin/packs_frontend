export const dateFormatter = (str) => {
  const date = new Date(str);
  return `${date.getDay()}-${date.getMonth()}-${date.getFullYear()}`;
};
