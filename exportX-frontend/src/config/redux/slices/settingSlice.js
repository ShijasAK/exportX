import { createSlice } from '@reduxjs/toolkit';
import { APP_DIR } from '../../constants/enums';

const initialState = {
    appDir: APP_DIR.LTR
}

export const settingSlice = createSlice({
    name: 'setting',
    initialState,
    reducers: {
        toggleAppDir: (state) => {
            state.appDir = state.appDir === APP_DIR.LTR ? APP_DIR.RTL : APP_DIR.LTR
        },
    },
})

export const { toggleAppDir } = settingSlice.actions

export default settingSlice.reducer