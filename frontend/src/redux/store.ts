import { legacy_createStore, applyMiddleware, combineReducers, Store } from "redux";
import { reducer as authReducer } from "./authReducer/reducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  authReducer,
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof rootReducer>;