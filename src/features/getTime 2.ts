export const getTime = (numTime: number): string => {
  const time = new Date(numTime * 1000);
  const year = time.getFullYear().toString();
  const month = ("0" + (time.getMonth() + 1)).slice(-2);
  const day = ("0" + time.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
};
