export const filterUsers = (arr = [], gender = "all", category = "all") => {
  if (gender !== "all") {
    arr = arr.filter((user) => user.gender === gender);
  }
  if (category !== "all") {
    arr = arr.filter(
      (user) => user.category?.type.toLowerCase() === category.toLowerCase()
    );
  }
  return arr;
};
