import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status : false ,
    userData : ""
}

const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers : {
        logIn : (state, action)=>{
            state.status = true
            state.userData = action.payload.userData
        },
        logOut : ( state ) => {
            state.status = false
            state.userData = ""
        }
    }
})

export const { logIn, logOut} = authSlice.actions;
export default authSlice.reducer;