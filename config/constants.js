// exports.GOOGLE_GEOCODE_API = `https://maps.googleapis.com/maps/api/geocode/json?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`;

exports.SOCKET_ACTIONS = {
  CONNECTION: "connection",
  DISCONNECTION: "disconnect",
  ADD_USER: "addUser",
  GET_USERS: "getUsers",
  conversation: {
    SEND_MESSAGE: "sendMessage",
    GET_MESSAGE: "getMessage",
  },
};

exports.GOOGLE_GEOCODE_API = `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyC9WeMRFmFpLH4ED2zp4LG0PfPsI5r1aj0`;
