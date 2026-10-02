import assert from "node:assert/strict";
import test from "node:test";
import { STAGES, clientsIn, createClient, moveClient } from "../js/model.js";

test("a client starts at Hello and can be moved", () => {
  const client = createClient({ name: "I. Shah", note: "A studio desk" });
  assert.equal(client.stage, "Hello");
  assert.equal(moveClient(client, "Build").stage, "Build");
});

test("blank names are refused and stages stay inside the desk", () => {
  assert.throws(() => createClient({ name: "  " }));
  assert.throws(() => moveClient(createClient({ name: "A" }), "Later"));
  assert.deepEqual(STAGES, ["Hello", "Fit", "Build", "Kept"]);
});

test("clients group by stage", () => {
  const list = [
    createClient({ name: "A", stage: "Hello" }),
    createClient({ name: "B", stage: "Kept" }),
  ];
  assert.equal(clientsIn(list, "Kept")[0].name, "B");
});
