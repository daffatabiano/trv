export const BASE_URL =
    'https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1';
export const AUTH_HEADERS = {
    apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c',
    'Content-Type': 'application/json',
};

export const BASE_HEADERS = {
    'Content-Type': 'application/json',
    apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
};
