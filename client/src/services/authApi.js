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
