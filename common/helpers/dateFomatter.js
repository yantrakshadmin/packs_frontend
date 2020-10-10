export const dateFormatter = (str) => {
  const date = new Date(str);
  return `${date.getDay()}-${date.getMonth()}-${date.getFullYear()}`;
};
export const utcDateFormatter = (str) =>{
  const date = new Date(str);
  return `${date.getUTCDate()}-${date.getUTCMonth()}-${date.getUTCFullYear()}`;
}
