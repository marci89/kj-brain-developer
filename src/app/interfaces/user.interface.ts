
//User model
export interface User {
  id: number;
  username: string;
  email: string;
  language: string;
  avatarId: number;
  created: Date;
}

//Request for login
export interface LoginRequest {
  identifier?: string;
  password?: string;
}

//Request for register
export interface RegistrationRequest {
  username: string;
  password: string;
  email: string;
  language: string;
  avatarId: number;
}

//Request for update user
export interface UpdateUserRequest {
  id: number;
  username: string;
  language: string;
  avatarId: number;
}
