import { getDatabase, set, ref, get, push, update } from "firebase/database";
import { app } from "../firebase-init";

const database = getDatabase(app);

export function writeDB(reference, data) {
  set(ref(database, reference), data);
}

export function updateDB(updateData) {
  update(ref(database), updateData);
}

export async function readDB(reference) {
  return await get(ref(database, reference));
}
