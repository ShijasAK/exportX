import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    history: [],
    currentIndex: null
}

export const historySlice = createSlice({
    name: 'history',
    initialState,
    reducers: {
        addHistory: (state, { payload }) => {
            state.history.push(payload)
        },
        increaseIndex: (state) => {
            state.currentIndex = state.currentIndex + 1
        },
        decreaseIndex: (state) => {
            state.currentIndex = state.currentIndex - 1
        },
        resetHistory: (state) => {
            state.history = []
            state.currentIndex = null
        },
    },
})

export const { addHistory, resetHistory, increaseIndex, decreaseIndex } = historySlice.actions

export default historySlice.reducer