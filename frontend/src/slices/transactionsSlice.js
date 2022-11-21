import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import transactionsService from "../services/transactionsService";

const initialState = {
  transactions: {},
  error: false,
  success: false,
  loading: false,
  message: null,
};

// Get transactions details
export const transactionsDetails = createAsyncThunk(
  "transactions/details",
  async (data, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const res = await transactionsService.transactionsDetails(data, token);


    return res;
  }
);


export const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(transactionsDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(transactionsDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.transactions = action.payload;
      })      
  },
});

export const { resetMessage } = transactionsSlice.actions;
export default transactionsSlice.reducer;
