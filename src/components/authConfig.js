// src/config/authConfig.js
export const API_URL = 'https://healthapi-zvfk.onrender.com';

export const AUTH_ERRORS = {
  SESSION_NOT_FOUND: 'Session not found',
  INVALID_CREDENTIALS: 'Invalid credentials',
  USER_NOT_FOUND: 'User not found',
  NETWORK_ERROR: 'Network error',
};

export const AUTH_ENDPOINTS = {
  CHECK_SESSION: `${API_URL}/api/check-session`,
  LOGIN: `${API_URL}/api/login`,
  LOGOUT: `${API_URL}/api/logout`,
};