export const sortByName = (arr, order = "ascendent") => {
  const newArr = [...arr];
  if (order === "ascendent") {
    return newArr.sort((a, b) => (a.name > b.name ? 1 : -1));
  }
  return newArr.sort((a, b) => (a.name > b.name ? -1 : 1));
};
