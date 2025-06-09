export interface AuthState {
  token: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: any;
}

export interface AuthPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
}
