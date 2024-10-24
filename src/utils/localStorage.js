export function getFromLS(name) {
  return JSON.parse(localStorage.getItem(name)) || null;
}

export function setLS(name, value) {
  return localStorage.setItem(name, JSON.stringify(value));
}
