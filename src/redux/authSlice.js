import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebase/config';
import { updateProfile } from "firebase/auth";
import { setCart } from "./cartSlice"; 
import { loadCartFromLocalStorage } from "../utils/cartStorage";

// SIGNUP
export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async ({ email, password, name }, thunkAPI) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update display name
      await updateProfile(user, {
        displayName: name,
      });

      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// LOGIN
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, thunkAPI) => {
    try {
      console.log("🔐 Attempting login for:", email);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      console.log("✅ Login successful for:", user.email);

      const cart = loadCartFromLocalStorage(user.email);
      console.log("🛒 Loaded cart from localStorage:", cart);

      thunkAPI.dispatch(setCart(cart));

      return {
        email: user.email,
        displayName: user.displayName,
      };
    } catch (error) {
      console.error("❌ Login failed:", error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// LOGOUT
export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, thunkAPI) => {
    try {
      await signOut(auth);
      return true;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    error: null,
    isAuthenticated: false
  },
  reducers: {},
  extraReducers: (builder) => {
    // SIGNUP
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // LOGOUT
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      });
  }
});

export default authSlice.reducer;