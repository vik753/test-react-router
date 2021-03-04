const initialState = {
  isAuth: false,
  isLoading: false,
  isAuthError: false,
  isGetDataError: false,
  users: [],
  posts: [],
  comments: {}
};

export const rootReducer = (state = initialState, action) => {
  // console.log("rootReducer", action);
  switch (action.type) {
    case "CHANGE_STATE":
      return { ...state, ...action.payload };
      case "ADD_COMMENTS":
      return { ...state, comments: {...state.comments, ...action.payload} };
    default:
      return state;
  }
};
