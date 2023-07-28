import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from 'js-cookie';

export const loadAuthenticationFromCookies = () => (dispatch) => {
  const userToken = Cookies.get('userToken');
  const userName = Cookies.get('userName');
  const isLoggedIn = Cookies.get('isLoggedIn') === 'true'; // Convert to a boolean

  if (userToken && userName && isLoggedIn) {
    dispatch(login.fulfilled({ authorization: userToken, username: userName }));
  }
};

export const login = createAsyncThunk(
  "auth/login", 
  async (userData) => {
  try {
    const response = await axios.post(
      "http://localhost:3001/login",
      userData
    );
    const { authorization } = response.headers;
    const { username } = response.data.status.data.user;
    return { authorization, username };
  } catch (err) {
    console.log("We had an issue with your request", err);
    alert("Try again");
  }
});

export const signup = createAsyncThunk(
    "auth/signup",
    async (userData) => {
        try {
            const response = await axios.post(
                "http://localhost:3001/signup",
                userData
            );
            return response.data;
        } catch (err) {
            alert("Try again");
        }
    }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userToken: null,
    isLoggedIn: false,
    userName: "",
  },
  reducers: {
    logout(state, action) {
      state.userToken = null;
      state.isLoggedIn = false;
      state.userName = "";
      Cookies.remove('userToken');
      Cookies.remove('userName');
      Cookies.remove('isLoggedIn');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.userToken = action.payload.authorization;
      state.isLoggedIn = true;
      state.userName = action.payload.username;
      Cookies.set('userToken', action.payload.authorization, { expires: 29 });
      Cookies.set('userName', action.payload.username, { expires: 29 });
      Cookies.set('isLoggedIn', true, { expires: 29 });
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;