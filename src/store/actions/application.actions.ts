import { ActionTypeMapping, ActionUnion, createAction } from "./base";

export enum names {
  initialize = "APPLICATION__INITIALIZE",
  setInitialized = "APPLICATION__SET_INITIALIZED"
}

export const actions = {
  initialize: () => createAction(names.initialize),
  setInitialized: (p: boolean) => createAction(names.setInitialized, p)
};

export type allTypes = ActionUnion<typeof actions>;
export type specificTypes = ActionTypeMapping<typeof actions>;
