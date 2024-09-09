export const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export const AUTH_HEADERS = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  'Content-Type': 'application/json',
};

export const BASE_HEADERS = (token) => {
  return {
    'Content-Type': 'application/json',
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    Authorization: `Bearer ${token}`,
  };
};

export const UPLOAD_HEADERS = (token) => {
  return {
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    Authorization: `Bearer ${localStorage.getItem(token)}`,
    'Content-Type': 'multipart/form-data',
  };
};

export const SUB_TOKEN_UPLOAD = process.env.SUB_TOKEN_UPLOAD;
