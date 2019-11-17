import { combineReducers } from "redux";
import { applicationActions } from "../actions";
import { createReducer } from "./base";

export interface ApplicationState {
  initialized: boolean;
}

export const applicationReducers = combineReducers<ApplicationState>({
  initialized: createReducer<boolean>(
    false,
    applicationActions.names.setInitialized
  )
});
