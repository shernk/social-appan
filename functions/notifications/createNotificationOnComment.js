const functions = require("firebase-functions");
const db = require("../handles/admin-db");

exports.createNotificationOnComment = functions.firestore
  .document("Comments/{id}")
  .onCreate((snapshot) => {
    return db
      .doc(`/Screams/${snapshot.data().screamId}`)
      .get()
      .then((doc) => {
        if (
          doc.exists &&
          doc.data().userHandle !== snapshot.data().userHandle
        ) {
          return db.doc(`/Notifications/${snapshot.id}`).set({
            screamId: doc.id,
            sender: snapshot.data().userHandle,
            recipient: doc.data().userHandle,
            type: "comment",
            read: false,
            createdAt: new Date().toISOString(),
          });
        }
      })
      .catch((err) => console.log(err));
  });
