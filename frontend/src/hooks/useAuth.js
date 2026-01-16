export const useAuth = () => {
  const loginUser = (token) => {
    localStorage.setItem("token", token);
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
  };

  const isAuthenticated = () => {
    return !!localStorage.getItem("token");
  };

  return { loginUser, logoutUser, isAuthenticated };
};
