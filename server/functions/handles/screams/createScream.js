const {db} = require('../admin-db');

exports.createScream = (req, res) => {
  const newScream = {
    body: req.body.body,
    userHandle: req.user.handle,
    userImageUrl: req.user.imageUrl,
    likeScreamCount: 0,
    commentScreamCount: 0,
    createdAt: new Date().toISOString(),
  };

  db.collection("Screams")
    .add(newScream)
    .then(() => {
      res.json(newScream);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};
