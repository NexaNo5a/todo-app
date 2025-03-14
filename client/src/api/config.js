//export const API_BASE_URL = 'http://127.0.0.1:8000';
export const API_BASE_URL='https://nexano5a-todo-app-28e17dbd5ae8.herokuapp.com'
export const LOGIN_URL = `${API_BASE_URL}/auth/users/login`;
export const REGISTER_URL = `${API_BASE_URL}/auth/users/register`;
export const USER_PROFILE_URL = (userId) => `${API_BASE_URL}/users/${userId}`;
export const UPDATE_USER_PROFILE_URL = (userId) => `${API_BASE_URL}/users/${userId}`;
export const ALL_TODOS_URL =(userId) => `${API_BASE_URL}/todos/${userId}`;
export const ADD_TODO_URL = (userId) => `${API_BASE_URL}/todos/${userId}`;

export const UPDATE_TODO_URL = (todoId) => `${API_BASE_URL}/todos/${todoId}`;