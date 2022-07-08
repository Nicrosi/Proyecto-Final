export const filterUsers = (arr = [], gender = "all", category = "all") => {
  if (gender !== "all") {
    arr = arr.filter((user) => user.gender === gender);
  }
  // if (category !== "all") { //aun no me trae categorias del back
  //   arr = arr.filter(
  //     (user) => user.category.type === category.toLowerCase()
  //   );
  // }
  return arr;
};
