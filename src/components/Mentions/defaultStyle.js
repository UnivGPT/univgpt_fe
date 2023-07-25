export default {
  control: {
    backgroundColor: "#e5e7eb",
    fontSize: 14,
    fontWeight: "normal",
    borderRadius: "1.5rem",
  },
  "&multiLine": {
    control: {
      fontSize: 16,
      minHeight: 270,
    },
    // highlighter: {
    //   padding: 9,
    //   border: "1px solid transparent",
    // },
    input: {
      padding: 30,
      height: "auto",
      overflowY: "auto",
      outline: "none",
    },
  },
  "&singleLine": {
    display: "inline-block",
    width: 180,
    highlighter: {
      padding: 1,
      border: "2px inset transparent",
    },
    input: {
      padding: 1,
    },
  },
  suggestions: {
    list: {
      position: "relative",
      borderradius: "0.25rem",
      backgroundColor: "#fff",
      // border: "1px solid rgba(0,0,0,0.15)",
      boxShadow: "0 0 0 1px rgba(0,0,0,.1), 0 10px 20px rgba(0,0,0,.1)",
      fontSize: "0.9rem",
      overflow: "hidden",
    },
    item: {
      display: "block",
      padding: "0.5rem 1rem",
      marginbottom: "0.1rem",
      transition: "background-color 0.3s",
      "&:hover": {
        backgroundColor: "#f2f2f2",
      },
      "&focused": {
        backgroundColor: "#DDE4F9",
      },
    },
  },
};
