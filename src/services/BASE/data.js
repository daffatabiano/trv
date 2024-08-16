export const BASE_URL =
    'https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1';
export const AUTH_HEADERS = {
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    'Content-Type': 'application/json',
};

// export const BASE_HEADERS = {
//     'Content-Type': 'application/json',
//     apiKey: process.env.NEXT_PUBLIC_API_KEY,
//     Authorization: `Bearer ${localStorage.getItem('token')}`,
// };

// export const UPLOAD_HEADERS = {
//     apiKey: process.env.NEXT_PUBLIC_API_KEY,
//     Authorization: `Bearer ${localStorage.getItem('token')}`,
//     'Content-Type': 'multipart/form-data',
// };
