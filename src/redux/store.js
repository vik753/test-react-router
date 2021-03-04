import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";

import { rootReducer } from "./rootRouter";
import rootSagaWatcher from "./sagas";
const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  combineReducers({ rootReducer }),
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSagaWatcher)