import { configureStore } from "@reduxjs/toolkit";
import policyReducer from "../components/policySplice";

const store = configureStore({
  reducer: {
    policy: policyReducer,
  },
});

export default store;
