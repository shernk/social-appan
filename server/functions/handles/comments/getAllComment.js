const { db } = require("../admin-db");

exports.getAllComments = (req, res) => {
  db.collection("Comments")
    .get()
    .then((data) => {
      let comments = [];
      data.forEach((comment) => {
        comments.push({
          commentId: comment.id,
          screamId: comment.data().screamId,
          userId: comment.data().userId,
          body: comment.data().body,
          userHandle: comment.data().userHandle,
          likeCommentCount: comment.data().likeCommentCount,
          replyCommentCount: comment.data().replyCommentCount,
          createdAt: comment.data().createdAt,
        });
        return res.json(comments);
      });
      res.status(500).json({ error: err.code });
    })
    .catch((err) => {
      console.log(err);
    });
};
