import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    loading: false,
    error: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logInSuccess: (state, action) => {
            state.currentUser = action.payload
            state.loading = false
            state.error = false
        },
        logInStart: (state) => {
            state.loading = true
        },
        logInFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        signout: (state) => {
            state.currentUser = null
            state.loading = false
            state.error = false
        }
    }
})

export const {logInFailure, logInStart, logInSuccess, signout} = userSlice.actions

export default userSlice.reducer