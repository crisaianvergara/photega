import { createSlice } from '@reduxjs/toolkit'
import type { AuthState } from '../../types/auth'
import {
    login,
    logout,
    fetchCurrentUser,
    createAccount,
    forgotPassword,
} from './AuthThunk'

const initialState: AuthState = {
    user: null,
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
                state.error = action.payload as string
            })
            .addCase(fetchCurrentUser.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchCurrentUser.fulfilled, (state, action) => {
                state.user = action.payload
                state.status = 'succeeded'
            })
            .addCase(fetchCurrentUser.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload as string
            })
            .addCase(createAccount.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(createAccount.fulfilled, (state) => {
                state.status = 'succeeded'
            })
            .addCase(createAccount.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload as string
            })
            .addCase(logout.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null
                state.token = null
                state.status = 'idle'
                state.error = null
            })
            .addCase(logout.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload as string
            })
            .addCase(forgotPassword.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(forgotPassword.fulfilled, (state) => {
                state.status = 'succeeded'
            })
            .addCase(forgotPassword.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload as string
            })
    },
})

export default authSlice.reducer
