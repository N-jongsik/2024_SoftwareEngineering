//import { createSlice } from '@reduxjs/toolkit';
//
//const initialState = { isLoggedIn: false, role: '', userId: 0, username: '' };
//
//const authSlice = createSlice({
//  name: 'auth',
//  initialState,
//  reducers: {
//    logout: (state) => {
//      console.log('logout slice');
//      state.isLoggedIn = false;
//      state.role = null;
//      state.userId = 0;
//      state.username = '';
//    },
//    loggedIn: (state, action) => {
//      state.isLoggedIn = true;
//      state.role = action.payload[1];
//      state.userId = action.payload[0];
//      state.username = action.payload[2];
//    },
//  },
//});
//
//export const { logout, loggedIn } = authSlice.actions;
//const { reducer } = authSlice;
//export default reducer;
