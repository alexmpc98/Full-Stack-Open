const Notification = ({ message, error }) => {
  if (message === null) {
    return null;
  }

  const messageStyle = {
    color: error? "red" : "green",
    fontStyle: "italic",
    backgroundColor: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  return <div style={messageStyle}>{message}</div>;
};

export default Notification;
