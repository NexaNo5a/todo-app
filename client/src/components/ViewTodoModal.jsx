import { useState, useEffect } from 'react'
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    Transition,
} from '@headlessui/react'
import {useDispatch, useSelector} from "react-redux";
import {closeItem, closeModal} from "../store/modalSlice";
import {deleteTodo, updateTodo} from "../api/todoApi";
import { updateTodo as updateTodoAction, deleteTodo as deleteTodoAction} from '../store/todoSlice'
import TodoToggleButton from "./TodoToggleButton";


//open selected item on todolist
export default function ViewTodoModal () {


    const isItemOpen = useSelector((state) => state.modal.isItemOpen);
    const { userId, token } = useSelector((state) => state.auth);
    const selectedTodo = useSelector((state) => state.modal.selectedTodo);
    const dispatch = useDispatch();

    const [title, setTitle] = useState( '');
    const [description, setDescription] = useState( '');
    const [completed, setCompleted] = useState(false)
    useEffect(() => {
        if (selectedTodo) {
            setTitle(selectedTodo.title || '');
            setDescription(selectedTodo.description || '');
        }
    }, [selectedTodo]);
    const handleSave = async (e) => {
        try {
            const todoData = { title, description };
            const response = await updateTodo(selectedTodo._id, token, todoData);
            console.log('UPDATED DATA: ----- ', response);
            dispatch(updateTodoAction(response));
            dispatch(closeItem());
        } catch (err) {
            console.error(err.message)
        }
    }
    const handleDelete = async (e) => {
        try {
            const response = await deleteTodo(selectedTodo._id, token);
            console.log('Delete todo: ----- ', response);
            dispatch(deleteTodoAction(selectedTodo._id));
            dispatch(closeItem());
        } catch (err) {
            console.error(err.message)
        }
    }

    const handleToggle = async () => {
        setCompleted(!completed)
    }

    return (
        <Dialog open={isItemOpen} onClose={() => dispatch(closeItem())} className="relative z-10">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel
                        transition
                        className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                    >
                        <div className="flex items-start gap-4 mb-4">
                            <TodoToggleButton completed={completed} onClick={handleToggle}/>
                            <div
                                className="rounded-lg bg-white w-full outline-none outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                                <label htmlFor="title" className="sr-only">
                                    Title
                                </label>
                                <input
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Title"
                                    className="border-none block w-full px-3 pt-2.5 text-lg font-medium text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0"
                                />
                                <label htmlFor="description" className="sr-only">
                                    Description
                                </label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Write a description..."
                                    className="block w-full resize-none px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"

                                />

                            </div>
                            </div>
                            <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                                <button
                                    type="button"
                                    onClick={handleSave}
                                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                                >
                                    Save
                                </button>
                                <button
                                    type="button"
                                    onClick={() => dispatch(closeItem())}
                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                                >
                                    Cancel
                                </button>
                            </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}
