export interface AuthState {
    token: string | null
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
    error: any
}

export interface AuthPayload {
    email: string
    password: string
}

export interface AuthResponse {
    access_token: string
    token_type: string
}

export interface CurrentUserState {
    id: string | null
    email: string | null
    is_active: boolean | null
    is_superuser: boolean | null
}

export interface CurrentUserResponse {
    id: string
    email: string
    is_active: boolean
    is_superuser: boolean
}
