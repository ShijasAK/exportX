import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: {},
    token: "",
    reset: {
        tempEmail: "",
        tempToken: ""
    },
    permissions: []
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (state, { payload }) => {
            state.user = payload.user
            state.token = payload.token
        },
        updateUser: (state, { payload }) => {
            state.user = payload
        },
        updateToken: (state, { payload }) => {
            state.token = payload
        },
        resetUser: (state) => {
            state.user = {}
            state.token = ""
            state.reset = {
                tempEmail: "",
                tempToken: ""
            }
        },
        addTempEmail: (state, { payload }) => {
            state.reset.tempEmail = payload
        },
        addTempToken: (state, { payload }) => {
            state.reset.tempToken = payload
        },
        resetTemp: (state) => {
            state.reset = {
                tempEmail: "",
                tempToken: ""
            }
        },
        updateProfile: (state, { payload }) => {
            state.user = { ...state.user, ...payload }
        },
    },
})

export const { addUser, resetUser, updateUser, addTempEmail, addTempToken, resetTemp, updateProfile,updateToken } = userSlice.actions

export default userSlice.reducer