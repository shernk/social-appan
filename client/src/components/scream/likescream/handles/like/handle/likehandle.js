const likeHandle = (screamId, likes, /* likeScreamAction, unlikeScreamAction */) => {
  const likedScream = () => {
    if (likes && likes.find((like) => like.screamId !== screamId)) return true;
    else return false;
  };

  // const likeScream = () => {
  //   likeScreamAction(screamId);
  // };

  // const unlikeScream = () => {
  //   unlikeScreamAction(screamId);
  // };

  return { 
    // likeScream,
    //  unlikeScream,
      likedScream };
};

export default likeHandle;
