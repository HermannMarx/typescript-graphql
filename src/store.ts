import { configureStore } from "@reduxjs/toolkit";

import Reducer from "./reducers";

const store = configureStore({
  reducer: { Issues: Reducer },
});

export default store;
