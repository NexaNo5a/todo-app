import {ALL_TODOS_URL, ADD_TODO_URL, UPDATE_TODO_URL} from "./config";

export const fetchTodos = async (userId, token) => {
    try{
        const response = await fetch(ALL_TODOS_URL(userId), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Assume token is available
            },
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

export const addTodo = async (userId,token, todoData) => {
    try{
        const response = await fetch(ADD_TODO_URL(userId), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body:JSON.stringify(todoData),
        })
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `Code: ${response.status}`)
        }
        return response.json();
    } catch (err) {
        console.error('Add todos error', err.message)
        throw err; //pass err to component
    }
}

export const updateTodo = async (todoId, token, todoData, ) => {
    try{
        const response = await fetch(UPDATE_TODO_URL(todoId), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body:JSON.stringify(todoData),
        })
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `Code: ${response.status}`)
        }
        return response.json();
    } catch (err) {
        console.error('Update todos error', err.message)
        throw err; //pass err to component
    }

}

export const deleteTodo = async (todoId, token) => {
    try{
        const response = await fetch(UPDATE_TODO_URL(todoId), {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `Code: ${response.status}`)
        }
        return { success: true, todoId };
    } catch (err) {
        console.error('Delete todos error', err.message)
        throw err; //pass err to component
    }

}