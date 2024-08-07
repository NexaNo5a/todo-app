import {ALL_TODOS_URL, TODO_URL} from "./config";

export const fetchTodos = async (userId, token) => {
    const response = await fetch(ALL_TODOS_URL(userId), {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`, // Assume token is available
        },
    })
    if (!response.ok) {
        throw new Error('Something wrong when get all todos!')
    }
    return response.json();
}

export const addTodo = async (todoId,todoContent, token) => {
    const response = await fetch(TODO_URL(todoId), {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body:JSON.stringify(todoContent),
    })
    if (!response.ok) {
        throw new Error('Something wrong when adding a todo!')
    }
    return response.json();
}

export const updateTodo = async (todoId, todoContent, token) => {
    const response = await fetch(TODO_URL(todoId), {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body:JSON.stringify(todoContent),
    })
    if (!response.ok) {
        throw new Error('Something wrong when updating a todo!')
    }
    return response.json();
}

export const deleteTodo = async (todoId, token) => {
    const response = await fetch(TODO_URL(todoId), {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    })
    if (!response.ok) {
        throw new Error('Something wrong when deleting a todo!')
    }
    return response.json();
}