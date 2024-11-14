export interface User {
    id?: number;
    username: string;
    email: string;
  }
  
  export interface LoginCredentials {
    email: string;
    password: string;
  }
  
  export interface RegisterCredentials extends LoginCredentials {
    username: string;
  }
  
  export interface AuthResponse {
    user: User;
    token: string;
  }