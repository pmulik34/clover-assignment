import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../components/taskSlice";

const store = configureStore({
  reducer: {
    todo: todoReducer,
  },
});

export default store;
