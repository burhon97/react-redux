import { configureStore } from "@reduxjs/toolkit";
import reducerSlice from "./reducer";

export const store = configureStore({
  reducer: {
    todoList: reducerSlice,
  },
});
