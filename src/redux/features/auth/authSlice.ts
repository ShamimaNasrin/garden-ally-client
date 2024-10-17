import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export type TAuthUser = {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  role: string;
  profilePhoto: string;
  favouritePosts?: string[];
  isVerified?: boolean;
  followers?: string[];
  followings?: string[];
  isDeleted: boolean;
};

type TAuthState = {
  user: null | TAuthUser;
  token: null | string;
};

const initialState: TAuthState = {
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, actions) => {
      const { user, token } = actions.payload;
      state.user = user;
      state.token = token;
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, logOut } = authSlice.actions;

export default authSlice.reducer;

export const useCurrentToken = (state: RootState) => state.auth.token;
export const useCurrentUser = (state: RootState) => state.auth.user;
