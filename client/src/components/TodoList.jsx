import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import {useDispatch, useSelector} from "react-redux";
import {openItem, openModal} from "../store/modalSlice";
import {useEffect, useState} from "react";
import TodoToggleButton from "./TodoToggleButton";
import {addTodo, deleteTodo, updateTodo} from "../api/todoApi";
import {
    addTodo as addTodoAction,
    deleteTodo as deleteTodoAction,
    revertCompleteStatus,
    toggleCompleteStatus,
    updateTodo as updateTodoAction
} from "../store/todoSlice";
import {useToggleTodo} from "./useToggleTodo";
import {addNotification} from "../store/notificationSlice";




function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const TodoList = ({todos}) => {
    const [markedFadeOut, setMarkedFadeOut] = useState({});
    const [pendingComplete, setPendingComplete] = useState({});
    const dispatch = useDispatch();
    const { userId, token } = useSelector(state => state.auth)
    const toggle = useToggleTodo();
    const fadeOutAndDo = (todo, actionFn,type= 'generic') => {
        setMarkedFadeOut((prev) => ({ ...prev, [todo._id]: true }));
        if (type === 'complete') {
            setPendingComplete((prev) => ({ ...prev, [todo._id]: true }));
        }
        setTimeout(() => {
            actionFn();
            setMarkedFadeOut((prev) => {
                const copy = { ...prev };
                delete copy[todo._id];
                return copy;
            });
            setPendingComplete((prev) => {
                const copy = { ...prev };
                delete copy[todo._id];
                return copy;
            });
        }, 300);
    };
    const visibleTodos = todos.filter(
        (todo) => !todo.completed || markedFadeOut?.[todo._id]
    );
    const handleEdit = (todo) => {
        console.log('Edit clicked todo:--------',todo)
        dispatch(openItem(todo))
    }
    const handleDelete = async (todo) => {
        fadeOutAndDo(todo, () => dispatch(deleteTodoAction(todo._id)),'delete');
        dispatch(addNotification({
            message: 'Todo deleted!',
            actionLabel: 'Undo',
            onAction: () => {
                dispatch(addTodoAction(todo));
                addTodo(userId, token, todo);
            }
        }))
        const response = await deleteTodo(todo._id, token)
        console.log('delete success!', response)
    }
    const handleComplete = (e,todo) => {
        e.preventDefault()
        fadeOutAndDo(todo, () => dispatch(toggleCompleteStatus(todo._id)),'complete');
        dispatch(addNotification({
            message: 'Todo completed!',
            actionLabel: 'Undo',
            onAction: () => dispatch(revertCompleteStatus(todo._id))
        }))
    }

    useEffect(() => {

    },[todos])
    return (
        <ul role="list" className="divide-y divide-gray-100 w-1/2 relative">
            {visibleTodos.map((todo) => (

                    <li key={todo._id}
                        className={classNames(
                            'transition-all duration-300',
                            markedFadeOut?.[todo._id] ? 'opacity-0 scale-95' : 'opacity-100 scale-100',
                            "group flex items-center justify-between rounded-md p-2 gap-x-6 py-5  hover:cursor-pointer hover:bg-gray-50"

                        )} onClick={() =>handleEdit(todo)}>
                        <div className="flex items-center gap-x-3 flex-1">
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                <TodoToggleButton disabled={markedFadeOut[todo._id]}
                                                  onClick={(e) => handleComplete(e,todo)}
                                                  completed={pendingComplete[todo._id] || todo.completed}
                                />
                            </div>

                            <div className="min-w-0">
                                <div className="flex items-start gap-x-3">
                                    <p className="text-sm font-semibold leading-6 text-gray-900">{todo.title}</p>

                                </div>

                            </div>
                        </div>
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete(todo);
                                }}
                                className="text-red-500 hover:text-red-700"
                                title="Delete"
                            >

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>
                                </svg>

                            </button>
                        </div>
                    </li>


            ))}
        </ul>
    )
}
export default TodoList;