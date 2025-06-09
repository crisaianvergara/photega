import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AuthPayload, AuthResponse, AuthState } from "../../types/auth";
import instance from "../../lib/axios";

const initialState: AuthState = {
  token: null,
  status: "idle",
  error: null,
};

export const login = createAsyncThunk<AuthResponse, AuthPayload>(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      const response = await instance.post(
        "/auth/jwt/login",
        {
          username: userData.email,
          password: userData.password,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );

      return {
        access_token: response.data.access_token,
        token_type: response.data.token_type,
      };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.detail);
    }
  },
);

export const logout = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("token");
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.access_token;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.token = null;
        state.status = "idle";
        state.error = null;
      });
  },
});

export default authSlice.reducer;
