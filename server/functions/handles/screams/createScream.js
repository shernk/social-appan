const {db} = require('../admin-db');

exports.createScream = (req, res) => {
  if (req.method !== "POST") {
    return res.status(400).json({ error: "Method not allowed" });
  }

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
      res.status(500).json({ message: `${err}` });
    });
};
