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
  if (
    (isToken && user?.roles === "ROLE_USER") ||
    user?.roles === "ROLE_ADMIN" ||
    role === "ROLE_ADMIN" ||
    role === "ROLE_USER"
  ) {
    console.log(true);
    return true;
  }
  console.log(false);
  return false;
}

export function isAdmin(user) {
  if (isToken && user?.roles === "ROLE_ADMIN") {
    return true;
  } else if (isToken && role === "ROLE_ADMIN") {
    return true;
  } else {
    return false;
  }
}
