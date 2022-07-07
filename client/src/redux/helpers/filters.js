export const filterByGender = (arr = [], gender = "all") => {
  if (gender === "all") return arr;
  else {
    return arr.filter((player) => player.gender === gender);
  }
};
