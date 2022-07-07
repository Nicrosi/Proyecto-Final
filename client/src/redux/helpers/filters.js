export const filterPlayers = (arr = [], gender = "all", category = "all") => {
  if (gender !== "all") {
    arr = arr.filter((player) => player.gender === gender);
  }
  if (category !== "all") {
    arr = arr.filter(
      (player) => player.category.type === category.toLowerCase()
    );
  }
  return arr;
};
