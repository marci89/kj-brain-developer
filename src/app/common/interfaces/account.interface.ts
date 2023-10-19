//Auth user
export interface LoginUser {
  id: number;
  username: string;
  email: string;
  language: string;
  avatarId: number;
  token: string;
}

//Change email
export interface ChangeEmailRequest {
  email: string;
  password: string;
}

//Change password
export interface ChangePasswordRequest {
  password: string;
  newPassword: string;
}

//forgot password
export interface ForgotPasswordRequest {
  identifier: string;
}

//reset password
export interface ResetPasswordRequest {
  password: string;
  token?: string;
}
