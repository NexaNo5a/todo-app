import {LOGIN_URL, REGISTER_URL, USER_PROFILE_URL, UPDATE_USER_PROFILE_URL} from "./config";

export const loginUser = async (email, password) => {
    const response = await fetch(LOGIN_URL, {
        method: 'POST',
        headers:{
            'Content type': 'application/json'
        },
        body:JSON.stringify({email, password}),
    })
    if (!response.ok) {
        throw new Error('Something wrong when login!')
    }
    return response.json();
}
export const registerUser = async (email, password, username) => {
    const response = await fetch(REGISTER_URL, {
        method: 'POST',
        headers:{
            'Content type': 'application/json'
        },
        body:JSON.stringify({email, password, username}),
    })
    if (!response.ok) {
        throw new Error('Something wrong when login!')
    }
    return response.json();
}
export const fetchUserProfile = async (userId, token) => {
    const response = await fetch(USER_PROFILE_URL(userId), {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`, // Assume token is available
        },
    });

    if (!response.ok) {
        throw new Error('Register failed!');
    }

    return response.json();
};