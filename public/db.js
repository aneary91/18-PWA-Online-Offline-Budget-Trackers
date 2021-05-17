let db;

//this is to create a new db request from the budget db
const request = indexedDB.open("budget", 1);
// the onupgreadeneeded property of the IDBOpenDBRequest interface is the event 
// handler for the upgradeneeded event. This is triggered when the database of the larger
// version number than the existing stored database is loaded. 
request.onupgreadeneeded = ({ event }) => {
  const db = event.result;

//   this is to create an object called 'pending'
  db.createObjectStore("pending", { auto_increment: true });
};

request.onsuccess = ({event}) => {
    db = event.result;
    if (navigator.onLine){
        checkDatabase();
    }
}
request.onerror = function(error) {
    console.log("Show me the error,if there is one");
};
function checkDatabase() {
    // this is to start a new transaction with pending dbTransaction
    const transaction = db.transaction(['pending'], 'readwrite');

    const store = transaction.objectstore
}

