import { getItem, removeItem } from "./localStorage";
const token = getItem("token");
const role = getItem("roles");
const isToken = token ? true : false;
console.log("token  :  " + isToken);
console.log("role  :  " + role);
console.log("ROLE_ADMIN");
export function logout() {
  removeItem("token");
  removeItem("user");
}

//Gestion role
export function isUser(user) {
  if (isToken && role != null) {
    if (role?.includes("ROLE_ADMIN") || role.includes("ROLE_USER")) {
      console.log(true);
      return true;
    }
  } else {
    console.log(false);
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
