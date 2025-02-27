import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from '../store/modalSlice';
import {Label, Listbox, ListboxButton, ListboxOption, ListboxOptions} from "@headlessui/react";
import {PaperClipIcon, TagIcon, UserCircleIcon} from "@heroicons/react/16/solid";
import {CalendarIcon} from "@heroicons/react/24/outline";
import classNames from "classnames";
import { addTodo} from "../api/todoApi";
import { addTodo as addTodoAction } from '../store/todoSlice';


const labels = [
    { name: 'Unlabelled', value: null },
    { name: 'Engineering', value: 'engineering' },
    // More items...
]
const dueDates = [
    { name: 'No due date', value: null },
    { name: 'Today', value: 'today' },
    // More items...
]
const assignees = [
    { name: 'Unassigned', value: null },
    {
        name: 'Wade Cooper',
        value: 'wade-cooper',
        avatar:
            'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    // More items...
]
//Add todo popup.
const TodoFormModal = () => {
    const isOpen = useSelector((state) => state.modal.isOpen);
    const { userId, token } = useSelector(state => state.auth)
    const dispatch = useDispatch();
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    if (!isOpen) return null;
    const handleCreate = async (e) => {
        e.preventDefault();
        const todoData = { title, description};
        try {
            const response = await addTodo(userId, token, todoData);
            dispatch(closeModal())
            dispatch(addTodoAction(response))
        } catch (err) {
            console.error(err.message)
        }
    }
    const handleClose = (e) => {
        if (e.target.id === "modal-overlay") {
            dispatch(closeModal());
        }
    }
    return (
        <>
            <div
                id="modal-overlay"
                onClick={handleClose}
                className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50"
            >
            <div className="flex m-auto inset-x-40 pt-20 absolute z-50"
                onClick={(e) => e.stopPropagation()}
            >
                <form action="#" className="relative flex flex-grow">
                    <div
                        className="overflow-hidden flex-grow rounded-lg border border-gray-100 shadow-sm bg-white focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
                        <label htmlFor="title" className="sr-only">
                            Title
                        </label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            placeholder="Title"
                            onChange={(e) => {setTitle(e.target.value)}}
                            className="block w-full border-0 pt-2.5 text-lg font-medium placeholder:text-gray-400 focus:ring-0"
                        />
                        <label htmlFor="description" className="sr-only">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            rows={2}
                            placeholder="Write a description..."
                            onChange={(e) => {setDescription(e.target.value)}}
                            className="block w-full resize-none border-0 py-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            defaultValue={''}
                        />

                        {/* Spacer element to match the height of the toolbar */}
                        <div aria-hidden="true">
                            <div className="py-2">
                                <div className="h-9"/>
                            </div>
                            <div className="h-px"/>
                            <div className="py-2">
                                <div className="py-px">
                                    <div className="h-9"/>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="absolute inset-x-px bottom-0">
                        {/* Actions: These are just examples to demonstrate the concept, replace/wire these up however makes sense for your project. */}
                        <div className="flex flex-nowrap justify-end space-x-2 px-2 py-2 sm:px-3">




                        </div>
                        <div
                            className="flex items-center justify-between space-x-3 border-t border-gray-200 px-2 py-2 sm:px-3">
                            <div className="flex">
                                <button
                                    type="button"
                                    className="group -my-2 -ml-2 inline-flex items-center rounded-full px-3 py-2 text-left text-gray-400"
                                >
                                    <PaperClipIcon aria-hidden="true"
                                                   className="-ml-1 mr-2 h-5 w-5 group-hover:text-gray-500"/>
                                    <span className="text-sm italic text-gray-500 group-hover:text-gray-600">Attach a file</span>
                                </button>
                            </div>
                            <div className="flex-shrink-0">
                                <button
                                    type="submit"
                                    className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    onClick={() => dispatch(closeModal())}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    onClick={handleCreate}
                                >
                                    Create
                                </button>

                            </div>
                        </div>
                    </div>
                </form>
            </div>
            </div>
        </>
    );
};

export default TodoFormModal;