import { createSlice } from '@reduxjs/toolkit'
import type { AuthState } from '../../types/auth'
import { login, logout } from './AuthThunk'

const initialState: AuthState = {
    token: null,
    status: 'idle',
    error: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.token = action.payload.access_token
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload
            })
            .addCase(logout.fulfilled, (state) => {
                state.token = null
                state.status = 'idle'
                state.error = null
            })
    },
})

export default authSlice.reducer
