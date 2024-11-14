import { AuthResponse, LoginCredentials, RegisterCredentials } from '../types';
import api from './api';
import Cookies from 'js-cookie';

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  try {
    const response = await api.post<AuthResponse>('/api/user/login', credentials);
    const { token, user } = response.data;

    Cookies.set('token', token, { expires: 7, secure: true, sameSite: 'Strict' });

    return { token, user };
  } catch (error) {
    console.error('Login error:', error);
    throw new Error('Login failed. Please check your credentials.');
  }
};

export const register = async (credentials: RegisterCredentials): Promise<AuthResponse> => {
  try {
    const response = await api.post<AuthResponse>('/api/user/register', credentials);
    const { token, user } = response.data;

    Cookies.set('token', token, { expires: 7, secure: true, sameSite: 'Strict' });

    return { token, user };
  } catch (error) {
    console.error('Registration error:', error);
    throw new Error('Registration failed. Please try again.');
  }
};

export const logout = (): void => {
  Cookies.remove('token');
};
