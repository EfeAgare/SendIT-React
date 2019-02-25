export const dateFormat = oldDate => {
  const date = new Date(oldDate);
  return date.toLocaleDateString();
};

export const newDateFormat = newDate => {
  const date = new Date(newDate);
  let year = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDate();
  let newdate = new Date();
  newdate.setFullYear(year, month, day + 10);
  return newdate.toLocaleDateString();
};