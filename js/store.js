import { createClient } from "./model.js";

const KEY = "custom-crm.v1";

export function load() {
  const raw = localStorage.getItem(KEY);
  if (!raw) return seed();
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : seed();
  } catch {
    return seed();
  }
}

export function save(clients) {
  localStorage.setItem(KEY, JSON.stringify(clients));
}

function seed() {
  const clients = [
    createClient({ name: "I. Shah", note: "Asked for a desk shaped to a small studio.", stage: "Hello" }),
    createClient({ name: "North Shed", note: "Wants the relationship kept in one place.", stage: "Fit" }),
  ];
  save(clients);
  return clients;
}
