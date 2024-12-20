// src/Components/utils/jwt.js

import { jwtDecode } from 'jwt-decode';

/**
 * Decodes a JWT token and returns its payload.
 * @param {string} token - The JWT token.
 * @returns {object|null} The decoded payload or null if invalid.
 */
export const decodeJWT = (token) => {
  try {
    return jwtDecode(token);
  } catch (error) {
    console.error('Failed to decode JWT:', error);
    return null;
  }
};

/**
 * Checks if a JWT token is expired.
 * @param {string} token - The JWT token.
 * @returns {boolean} True if expired, false otherwise.
 */
export const isTokenExpired = (token) => {
  const decoded = decodeJWT(token);
  if (!decoded || !decoded.exp) return true;

  const currentTime = Date.now() / 1000; // Current time in seconds
  return decoded.exp < currentTime;
};
