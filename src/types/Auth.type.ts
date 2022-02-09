export interface LoginType {
  username: string;
  password: string;
}

export interface LoginReturnType {
  access_token: string;
  refresh_code?: string;
}

export interface AuthSlice {
  access_token: string;
  refresh_code: string;
}
