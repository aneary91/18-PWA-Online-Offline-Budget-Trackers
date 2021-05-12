let db;

//
const request = indexedDB.open("budget", 1);

request.onupgreadeneeded = ({ event }) => {
  const db = event.result;

  db.createObjectStore("pending", { auto_increment: true });
};

