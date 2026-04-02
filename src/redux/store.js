import { configureStore } from "@reduxjs/toolkit";
import serviceReducer from "./slice";
import { serviceApi } from "./service";

const store = configureStore({
  reducer: {
    service: serviceReducer,
    [serviceApi.reducerPath]: serviceApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // disables warnings for non-serializable values (like RTK Query objects)
    }).concat(serviceApi.middleware),
  devTools: process.env.NODE_ENV !== "production", // optional, enable Redux DevTools only in dev
});

export default store;