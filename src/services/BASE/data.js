export const BASE_URL =
    'https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1';
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
