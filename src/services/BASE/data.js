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

export const SUB_TOKEN_UPLOAD =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI5NWE4MDNjMy1iNTFlLTQ3YTAtOTBkYi0yYzJmM2Y0ODE1YTkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2Nzk4NDM0NDR9.ETsN6dCiC7isPReiQyHCQxya7wzj05wz5zruiFXLx0k';
