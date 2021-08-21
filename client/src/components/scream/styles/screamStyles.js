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
};

export default screamStyles;
