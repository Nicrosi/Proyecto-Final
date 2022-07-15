export const setToken = (token) => {
  localStorage.setItem("token", token);
  /*   localStorage.setItem("lastLoginTime", new Date(Date.now()).getTime()); */
};

export const getToken = () => {
  /*   const now = new Date(Date.now()).getTime();
  const timeAllowed = 1000 * 60 * 30;
  const timeSinceLastLogin = now - localStorage.getItem("lastLoginTime");
  if (timeSinceLastLogin < timeAllowed) {
  } */
  return localStorage.getItem("token");
};

export const deleteToken = () => {
  localStorage.removeItem("token");
  /* localStorage.removeItem("lastLoginTime"); */
};
