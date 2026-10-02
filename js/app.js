import { STAGES, createClient, moveClient } from "./model.js";
import { load, save } from "./store.js";

const list = document.querySelector("#list");
const detail = document.querySelector("#detail");
const form = document.querySelector("#new-client");
const empty = document.querySelector("#empty");
let clients = load();
let selected = clients[0]?.id || null;

function render() {
  list.innerHTML = "";
  STAGES.forEach((stage) => {
    const group = document.createElement("section");
    const title = document.createElement("h2");
    title.textContent = stage;
    group.appendChild(title);
    clients.filter((client) => client.stage === stage).forEach((client) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = client.id === selected ? "row is-on" : "row";
      button.textContent = client.name;
      button.addEventListener("click", () => {
        selected = client.id;
        render();
      });
      group.appendChild(button);
    });
    list.appendChild(group);
  });

  const client = clients.find((item) => item.id === selected);
  empty.hidden = Boolean(client);
  detail.hidden = !client;
  if (!client) return;
  detail.querySelector("#who").textContent = client.name;
  detail.querySelector("#note").textContent = client.note || "No note yet.";
  const stages = detail.querySelector("#stages");
  stages.innerHTML = "";
  STAGES.forEach((stage) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = stage;
    button.className = client.stage === stage ? "is-on" : "";
    button.addEventListener("click", () => {
      clients = clients.map((item) => item.id === client.id ? moveClient(item, stage) : item);
      save(clients);
      render();
    });
    stages.appendChild(button);
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const client = createClient({ name: data.get("name"), note: data.get("note") });
  clients = [client, ...clients];
  selected = client.id;
  save(clients);
  form.reset();
  render();
});

detail.querySelector("#remove").addEventListener("click", () => {
  clients = clients.filter((item) => item.id !== selected);
  selected = clients[0]?.id || null;
  save(clients);
  render();
});

render();
