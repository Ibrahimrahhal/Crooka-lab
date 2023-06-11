const initial = false;

export default (state = initial, action) => {
  if (action.type === "auth-state") {
    state = action.payload.state;
  }
  return state;
};
