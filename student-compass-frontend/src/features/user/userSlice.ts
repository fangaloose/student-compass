import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  id:string,
  fname:string,
  lname:string,
  email:string,
  role: 'unauth' | 'admin' | 'teacher' | 'student';
  jwt:string;
}

const initialState: UserState = {
  id:"",
  fname:"",
  lname:"",
  email:"",
  role: 'unauth',
  jwt:"",
};



export const userSlice = createSlice({
  name: 'userReducer',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    changeAuth: (state, action: PayloadAction<UserState>) => {

      state.id=action.payload.id
      state.fname=action.payload.fname
      state.lname=action.payload.lname
      state.email=action.payload.email
      state.role=action.payload.role
      state.jwt=action.payload.jwt
      localStorage.setItem('token', action.payload.jwt);

    },

  },

});

export const { changeAuth } = userSlice.actions;


export default userSlice.reducer;
