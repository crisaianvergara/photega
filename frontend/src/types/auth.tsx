export interface AuthRequest {
    email: string
    password: string
}

export interface LoginResponse {
    access_token: string
    token_type: string
}

export interface User {
    id: string
    email: string
    is_active: string
    is_superuser: string
    is_verified: string
}

export interface AuthState {
    user: User | null
    token: string | null
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
    error: string | null
}

export interface ForgotPasswordRequest {
    email: string
}

export interface ResetPasswordRequest {
    token: string | null
    newPassword: string
}
