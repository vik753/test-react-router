import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
  getAuthCreds,
  getPostCommentsApi,
  getPostsApi,
  getUsersApi,
} from "../api/api";

function* getAuthWorker({ payload }) {
  const { login, password } = payload;
  try {
    yield put({ type: "CHANGE_STATE", payload: { isLoading: true } });
    const credentials = yield call(getAuthCreds);
    if (login === credentials.login && password === credentials.password) {
      yield put({
        type: "CHANGE_STATE",
        payload: { isLoading: false, isAuth: true, isAuthError: false },
      });
      window.localStorage.setItem("_auth_creds", JSON.stringify(credentials));
    } else {
      yield put({
        type: "CHANGE_STATE",
        payload: { isLoading: false, isAuthError: true },
      });
    }
  } catch (err) {
    console.log("getAuth Saga", err);
  }
}

function* getUsersWorker() {
  try {
    yield put({
      type: "CHANGE_STATE",
      payload: { isLoading: true },
    });
    const users = yield call(getUsersApi);
    if (users) {
      yield put({
        type: "CHANGE_STATE",
        payload: {
          users,
          isLoading: false,
          isAuthError: false,
          isGetDataError: false,
        },
      });
    } else {
      yield put({
        type: "CHANGE_STATE",
        payload: {
          isLoading: false,
          isGetDataError: true,
        },
      });
    }
  } catch (err) {
    console.log("getUsersWorker Error", err);
  }
}

function* getPostsWorker({ payload }) {
  try {
    yield put({ type: "CHANGE_STATE", payload: { isLoading: true } });
    const posts = yield call(getPostsApi, payload);

    if (!posts) {
      yield put({
        type: "CHANGE_STATE",
        payload: {
          isLoading: false,
          isGetDataError: true,
        },
      });
      return;
    }

    yield put({
      type: "CHANGE_STATE",
      payload: {
        isLoading: false,
        isGetDataError: false,
        posts,
      },
    });
  } catch (err) {
    console.log("getPostsWorker Error", err);
  }
}

function* getPostCommentsWorker({ payload }) {
  try {
    yield put({ type: "CHANGE_STATE", payload: { isLoading: true } });
    const comments = yield call(getPostCommentsApi, payload);

    if (!comments) {
      yield put({
        type: "CHANGE_STATE",
        payload: {
          isLoading: false,
          isGetDataError: true,
        },
      });
      return null;
    }

    yield put({
      type: "CHANGE_STATE",
      payload: {
        isLoading: false,
        isGetDataError: false,
      },
    });
    yield put({
      type: "ADD_COMMENTS",
      payload: {
        [payload]: comments
      },
    });
  } catch (err) {
    console.log("getPostsWorker Error", err);
  }
}

export default function* rootSagaWatcher() {
  yield takeLatest("GET_AUTH_SAGA", getAuthWorker);
  yield takeLatest("GET_DATA_SAGA", getUsersWorker);
  yield takeLatest("GET_POSTS_SAGA", getPostsWorker);
  yield takeEvery("GET_POST_COMMENTS_SAGA", getPostCommentsWorker);
}
