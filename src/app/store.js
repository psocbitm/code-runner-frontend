import { configureStore } from "@reduxjs/toolkit"
import { submitCodeApi } from "../services/submitCode"
import codeReducer from "../features/codeSlice"
import languageReducer from "../features/languageSlice"
export const store = configureStore({
  reducer: {
    [submitCodeApi.reducerPath]: submitCodeApi.reducer,
    code: codeReducer,
    language: languageReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(submitCodeApi.middleware),
})
