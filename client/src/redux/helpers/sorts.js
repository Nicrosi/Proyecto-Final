export const sortByName = (arr, order = "ascendent") => {
  const newArr = [...arr];
  if (order === "ascendent") {
    return newArr.sort((a, b) =>
      a.name.toLowerCase().localeCompare(b.name.toLowerCase())
    );
  }
  return newArr.sort((a, b) =>
    b.name.toLowerCase().localeCompare(a.name.toLowerCase())
  );
};
