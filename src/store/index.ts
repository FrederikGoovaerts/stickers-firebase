import { createStore, Store } from "redux";
import { devToolsEnhancer } from "redux-devtools-extension";

import rootReducer from "./reducers";

export const store: Store = createStore(rootReducer, devToolsEnhancer({}));
