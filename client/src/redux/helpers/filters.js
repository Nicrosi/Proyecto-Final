export const filterByGender = (arr = [], gender = "all") => {
  if (gender === "all") return arr;
  else {
    return arr.filter((player) => {
      console.log(player.gender, gender);
      return player.gender === gender;
    });
  }
};
