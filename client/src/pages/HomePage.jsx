import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {fetchTodos} from "../api/todoApi";
import TodoList from "../components/TodoList";
import { setTodos } from '../store/todoSlice';
import EmptyState from "../components/EmptyState";
import { useSelector, useDispatch} from "react-redux";

const HomePage = () => {

    const { userId, token } = useSelector(state => state.auth);

    const todos = useSelector(state => state.todo.items); // 从 Redux 获取
    const dispatch = useDispatch();
    useEffect(() => {
        if (!userId || !token) return;
        const loadTodos = async () => {
            try {
                const response = await fetchTodos(userId, token);
                console.log('Fetch todos: ----', response.data)
                dispatch(setTodos(response.data));
            } catch (err) {
                console.error('Error fetching todos', err);
            }
        };
        loadTodos().catch(err => {
            console.error('Unhandled promise rejection in loadTodos', err);
        });
    },[userId, token,dispatch])
    return (
        <>
            <div className="flex-grow flex items-center justify-center overflow-y-auto ">
                    {todos.length === 0
                        ?   <EmptyState />
                        :  <TodoList todos={todos} />
                    }

            </div>
        </>
    )
}
export default HomePage;