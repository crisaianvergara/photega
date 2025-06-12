import { createAsyncThunk } from '@reduxjs/toolkit'
import type {
    AuthPayload,
    AuthResponse,
    CurrentUserResponse,
} from '../../types/auth'
import instance from '../../lib/axios'

export const login = createAsyncThunk<AuthResponse, AuthPayload>(
    'auth/login',
    async (userData, thunkAPI) => {
        try {
            const response = await instance.post(
                '/auth/jwt/login',
                {
                    username: userData.email,
                    password: userData.password,
                },
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                }
            )

            return response.data
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data.detail)
        }
    }
)

export const getCurrentUser = createAsyncThunk<CurrentUserResponse | any>(
    'auth/getCurrentUser',
    async (_, thunkAPI) => {
        try {
            const response = await instance.get('/users/me')
            return response.data
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data.detail)
        }
    }
)

export const logout = createAsyncThunk('auth/logout', async () => {
    localStorage.removeItem('token')
})
