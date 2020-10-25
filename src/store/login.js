let initialState = {
  loggedIn: false,
  username: "",
  color: "",
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "LOGIN":
      return { loggedIn: true, username: payload.username, color: payload.color };
    case "LOGOUT":
      return initialState;
    case "LOCATION":
      return {
        ...state,
        latitude: payload.latitude,
        longitude: payload.longitude,
      };
    default:
      return state;
  }
};

export const login = (userObj) => {
  return {
    type: "LOGIN",
    payload: { username: userObj.username, color: userObj.color }
  };
};

export const logout = () => {
  return {
    type: "LOGOUT",
    payload: "",
  };
};

export const location = (location) => {
  return {
    type: "LOCATION",
    payload: location,
  };
};
