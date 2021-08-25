import theme from "../../../themes/theme";

const screamStyles = {
  card: {
    display: "flex",
    position: "relative",
    marginBottom: 15,
  },
  image: {
    minWidth: 200,
  },
  content: {
    padding: 25,
    objectFit: "cover",
  },
  inline: {
    display: "inline-flex",
  },
  deleteButton: {
    position: "absolute",
    left: "90%",
    top: "10%",
  },
  screamPost: {
    ...theme,
    submitButton: {
      position: "relative",
      float: "right",
      marginTop: 10,
    },
    progressSpinner: {
      position: "absolute",
    },
    closeButton: {
      position: "absolute",
      left: "91%",
      top: "6%",
    },
  },
  screamDialog: {
    // ...theme,
    profileImage: {
      maxWidth: 200,
      height: 200,
      borderRadius: "50%",
      objectFit: "cover",
    },
    dialogContent: {
      padding: 20,
    },
    closeButton: {
      position: "absolute",
      left: "90%",
    },
    expandButton: {
      position: "absolute",
      left: "90%",
    },
    spinnerDiv: {
      textAlign: "center",
      marginTop: 50,
      marginBottom: 50,
    },
  },
  comments: {
    ...theme,
    commentImage: {
      maxWidth: "100%",
      height: 100,
      objectFit: "cover",
      borderRadius: "50%",
    },
    commentData: {
      marginLeft: 20,
    },
  },
};

export default screamStyles;
