import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import transactionService from "../services/transactionService";

const initialState = {
  transaction: {},
  error: false,
  success: false,
  loading: false,
  message: null,
};

// Get account details
export const transaction = createAsyncThunk(
  "account/details",
  async (user, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await transactionService.transaction(user, token);
     // Check for errors
     if (data.message) {
      return thunkAPI.rejectWithValue(data.message);
    }
    return data;
  }  
  
);


export const transactionsSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = null;
      state.error = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(transaction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(transaction.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.account = action.payload;
      }).addCase(transaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
      });     
  },
});

export const { resetMessage } = transactionsSlice.actions;
export default transactionsSlice.reducer;
