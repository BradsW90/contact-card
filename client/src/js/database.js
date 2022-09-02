import { openDB } from "idb";
import "regenerator-runtime/runtime";

export const initDb = async function () {
  openDB("contact_db", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("contacts")) {
        console.log("contacts store already exists");
        return;
      }
      db.createObjectStore("contacts", { keyPath: "id", autoIncrement: true });
      console.log("contacts store created");
    },
  });
};

export const getDb = async function () {
  console.log("GET from the database");

  //creates a connection to the indexeddb database and the version we want to use
  const contactDb = await openDB("contact_db", 1);
  //create a new transaction and specifiy the store and data privileges
  const tx = contactDb.transaction("contacts", "readonly");
  //open up the desired object store
  const store = tx.objectStore("contacts");
  //use the .getAll() method to get all data in the database
  const request = store.getAll();
  //Get confirmation of the request
  const result = await request;
  console.log("result.value", result);
  return result;
};

export const postDb = async function (name, email, phone, profile) {
  const contactDb = await openDB("contact_db", 1);
  const tx = contactDb.transaction("contacts", "readwrite");
  const store = tx.objectStore("contacts");
  const request = store.add({
    name: name,
    email: email,
    phone: phone,
    profile,
    profile,
  });
  const result = await request;
  console.log("data saved to the database", result);
};

export const deleteDb = async function (id) {
  console.log("DELETE from the database", id);
  const contactDb = await openDB("contact_db", 1);
  const tx = contactDb.transaction("contacts", "readwrite");
  const store = tx.objectStore("contacts");
  const request = store.delete(id);
  const result = await request;
  console.log("result.value", result);
  return result?.value;
};
