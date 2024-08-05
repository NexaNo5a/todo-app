export const API_BASE_URL = 'https://127.0.0.1:8000';
export const LOGIN_URL = `${API_BASE_URL}/login`;
export const REGISTER_URL = `${API_BASE_URL}/register`;
export const USER_PROFILE_URL = (userId) => `${API_BASE_URL}/users/${userId}`;
export const UPDATE_USER_PROFILE_URL = (userId) => `${API_BASE_URL}/users/${userId}`;
export const ALL_TODOS_URL =(userId) => `${API_BASE_URL}/${userId}/todos`;
export const TODO_URL = (todoId) => `${API_BASE_URL}/todos${todoId}`;

