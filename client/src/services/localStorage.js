export function removeItem(itemToRemove) {
  return window.localStorage.removeItem(itemToRemove);
}
export function getItem(item) {
  return JSON.parse(window.localStorage.getItem(item));
}

export function addItem(localStorageName, newItem) {
  return window.localStorage.setItem(localStorageName, JSON.stringify(newItem));
}
