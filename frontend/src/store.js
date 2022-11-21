import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import transactionsReducer from "./slices/transactionsSlice"
import transactionReducer from "./slices/transactionSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    transactions: transactionsReducer,
    transaction: transactionReducer
  },
});
