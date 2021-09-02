import { getItem, removeItem } from "./localStorage";

export function hasAuthenticated() {
  const token = getItem("token");
  const result = token ? true : false;

  if (false === result) {
    removeItem("token");
  }
  return result;
}

export function logout() {
  removeItem("token");
}
