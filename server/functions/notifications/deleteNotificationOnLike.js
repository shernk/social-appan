const functions = require('firebase-functions');
const { db } = require("../handles/admin-db");


exports.deleteNotificationOnLike = functions.firestore
  .document('Likes/{id}')
  .onDelete(snapshot => {
    return db.doc(`/Notifications/${snapshot.id}`)
      .delete()
      .catch((err) => console.log(err));
  })