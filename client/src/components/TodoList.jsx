import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import {useDispatch} from "react-redux";
import {openItem, openModal} from "../store/modalSlice";
import {useEffect, useState} from "react";
import TodoToggleButton from "./TodoToggleButton";



function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const TodoList = ({todos}) => {
    const dispatch = useDispatch();
    const [completed, setCompleted] = useState(false)
    const handleEdit = (todo) => {
        console.log('Edit clicked todo:--------',todo)
        dispatch(openItem(todo))
    }
    const handleDelete = (todo) => {

    }
    const handleComplete = (todo) => {
    setCompleted(!completed)
    }
    useEffect(() => {

    },[todos])
    return (
        <ul role="list" className="divide-y divide-gray-100 w-1/2 relative">
            {todos.map((todo) => (
                <li key={todo._id}
                    className="group flex items-center justify-between rounded-md p-2 gap-x-6 py-5  hover:cursor-pointer hover:bg-gray-50"
                    onClick={() => handleEdit(todo)}>
                    <div className="flex items-center gap-x-3 flex-1">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <TodoToggleButton onClick={handleComplete} completed={completed}/>
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
                                    handleDelete(todo._id);
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