export const STAGES = ["Hello", "Fit", "Build", "Kept"];

export function createClient({ name, note, stage, id, createdAt }) {
  const cleanName = String(name || "").trim();
  if (!cleanName) throw new Error("A client needs a name");
  const cleanStage = STAGES.includes(stage) ? stage : "Hello";
  return {
    id: id || cryptoRandom(),
    name: cleanName,
    note: String(note || "").trim(),
    stage: cleanStage,
    createdAt: createdAt || new Date().toISOString(),
  };
}

export function moveClient(client, stage) {
  if (!STAGES.includes(stage)) throw new Error("Unknown stage");
  return { ...client, stage };
}

export function clientsIn(list, stage) {
  return list.filter((client) => client.stage === stage);
}

function cryptoRandom() {
  return Math.random().toString(36).slice(2, 10);
}
