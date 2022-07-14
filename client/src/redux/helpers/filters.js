export const filterUsers = (arr = [], gender = "all", category = "all") => {
  if (gender !== "all") {
    arr = arr.filter((user) => user.gender === gender);
  }
  if (category !== "all") {
    if (category === "none") {
      arr = arr.filter((user) => !user.category);
    } else {
      arr = arr.filter(
        (user) => user.category?.type.toLowerCase() === category.toLowerCase()
      );
    }
  }
  return arr;
};
