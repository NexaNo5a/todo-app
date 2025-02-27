import {LOGIN_URL, REGISTER_URL, USER_PROFILE_URL, UPDATE_USER_PROFILE_URL} from "./config";

export const loginUser = async (email, password) => {
    try{
        const response = await fetch(LOGIN_URL, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({email, password}),
        })
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `Code: ${response.status}`)
        }
        return response.json();
    } catch (err) {
        throw err; //pass err to component
    }
}
export const registerUser = async (username, email, password) => {
    try{
        const response = await fetch(REGISTER_URL, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({username, email, password}),
        })
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `Code: ${response.status}`)
        }
        return response.json();
    } catch (err) {
        throw err; //pass err to component
    }
}
export const fetchUserProfile = async (userId, token) => {
    try{
        const response = await fetch(USER_PROFILE_URL(userId), {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, // Assume token is available
            },
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `Code: ${response.status}`)
        }
        return response.json();
    } catch (err) {
        throw err; //pass err to component
    }

};