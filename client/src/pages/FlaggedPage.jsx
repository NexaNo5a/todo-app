import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {fetchTodos, addTodo, updateTodo, deleteTodo} from "../api/todoApi";
import SideBar from "../components/SideBar";
import TodoList from "../components/TodoList";
import EmptyState from "../components/EmptyState";

const FlaggedPage = ({userId, token}) => {
    const [taskname, setTaskname] = useState("");
    const [description, setDescription] = useState("");
    const [duedate, setDuedate] = useState("");
    const [location, setLocation] = useState("");
    const [tag, setTag] = useState("");
    const [todos, setTodos] = useState([]);
    useEffect(() => {
        const loadTodos = async () => {
            try {
                const response = await fetchTodos(userId, token);
                const todos = response.data;
                setTodos(todos);
            } catch (err) {
                console.error('Error fetching todos', err);
            }
        };
        loadTodos().catch(err => {
            console.error("Unknown error",err);
        })
    },[userId, token])
    return (
        <>
                <div className="flex flex-grow items-center justify-center">
                    <EmptyState />
                </div>
        </>
    )
}
export default FlaggedPage;