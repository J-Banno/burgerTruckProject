import { getItem, removeItem } from "./localStorage";

export function hasAuthenticated() {
  const token = getItem("user");
  const result = token ? true : false;

  if (false === result) {
    removeItem("user");
  }
  return result;
}

export function logout() {
  removeItem("token");
  removeItem("user");
}

//Gestion role
export function isUser(user) {
  if (user?.roles === "ROLE_USER" || user?.roles === "ROLE_ADMIN") {
    return true;
  }
  return false;
}

export function isAdmin(user) {
  if (user?.roles === "ROLE_ADMIN") {
    return true;
  }
  return false;
}
