// Saga actions
export const getUsers = () => ({
  type: "GET_DATA_SAGA",
});

export const getPosts = (userId) => ({
  type: "GET_POSTS_SAGA",
  payload: userId,
});

export const getAuth = (loginData) => ({
  type: "GET_AUTH_SAGA",
  payload: loginData,
});

export const getPostComments = (postId) => ({
  type: "GET_POST_COMMENTS_SAGA",
  payload: postId,
});

// Other actions
export const getLogout = () => ({
  type: "CHANGE_STATE",
  payload: {
    isAuth: false,
    isAuthError: false,
  },
});

export const clearPosts = () => ({
  type: "CHANGE_STATE",
  payload: {
    posts: [],
  },
});

export const clearComments = () => ({
  type: "CHANGE_STATE",
  payload: {
    comments: {},
  },
});

export const setIsGetDataError = (flag) => ({
  type: "CHANGE_STATE",
  payload: {
    isLoading: false,
    isGetDataError: flag,
  },
});
