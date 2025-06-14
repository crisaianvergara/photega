import { createAsyncThunk } from '@reduxjs/toolkit'
import {
    type LoginResponse,
    type AuthRequest,
    type User,
} from '../../types/auth'
import instance from '../../lib/axios'

export const login = createAsyncThunk<LoginResponse, AuthRequest>(
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
    async (userData, thunkAPI) => {
        try {
            const response = await instance.post('/auth/register', {
                email: userData.email,
                password: userData.password,
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
