import { createAsyncThunk } from '@reduxjs/toolkit'
import {
    type LoginResponse,
    type AuthRequest,
    type User,
    type ForgotPasswordRequest,
} from '../../types/auth'
import instance from '../../lib/axios'

export const login = createAsyncThunk<LoginResponse, AuthRequest>(
    'auth/login',
    async (data, thunkAPI) => {
        try {
            const response = await instance.post(
                '/auth/jwt/login',
                {
                    username: data.email,
                    password: data.password,
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

export const fetchCurrentUser = createAsyncThunk<User | any>(
    'auth/fetchCurrentUser',
    async (_, thunkAPI) => {
        try {
            const response = await instance.get('/users/me')
            return response.data
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data.detail)
        }
    }
)

export const createAccount = createAsyncThunk<User, AuthRequest>(
    'auth/register',
    async (data, thunkAPI) => {
        try {
            const response = await instance.post('/auth/register', {
                email: data.email,
                password: data.password,
            })

            return response.data
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data.detail)
        }
    }
)

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
    try {
        const response = await instance.post('/auth/jwt/logout')
        localStorage.removeItem('accessToken')
        return response.data
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data.detail)
    }
})

export const forgotPassword = createAsyncThunk<any, ForgotPasswordRequest>(
    'auth/forgotPassword',
    async (data, thunkAPI) => {
        try {
            const response = await instance.post('/auth/forgot-password', {
                email: data.email,
            })

            return response.data
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data.detail)
        }
    }
)
