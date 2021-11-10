import { getItem, removeItem } from "./localStorage";
const token = getItem("token");
const role = getItem("roles");
const isToken = token ? true : false;
export function logout() {
  removeItem("token");
  removeItem("user");
}

//Gestion role
export function isUser(user) {
  if (isToken && role != null) {
    if (role?.includes("ROLE_ADMIN") || role.includes("ROLE_USER")) {
      return true;
    }
  } else {
    return false;
  }
}

export function isAdmin(user) {
  if (role != null && role.includes("ROLE_ADMIN")) {
    return true;
  } else {
    return false;
  }
}
