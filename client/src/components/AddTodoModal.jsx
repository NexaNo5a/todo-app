
import { useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'
import {useDispatch, useSelector} from "react-redux";
import {closeModal} from "../store/modalSlice";
import {addTodo} from "../api/todoApi";
import { addTodo as addTodoAction } from '../store/todoSlice';
export default function AddTodoModal() {
    const { userId, token } = useSelector(state => state.auth)
    const isModalOpen = useSelector((state) => state.modal.isOpen);
    const dispatch = useDispatch()
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const handleSave = async () => {
        const todoData = { title, description};
        try {
            if (title.trim() !=='') {
                const response = await addTodo(userId, token, todoData);
                dispatch(closeModal())
                dispatch(addTodoAction(response))
            } else {
                alert('Please fill the title');
            }
        } catch (err) {
            console.error(err);
        }

    }
    return (
        <Dialog open={isModalOpen} onClose={() => dispatch(closeModal())} className="relative z-10">
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
                        <div
                            className="rounded-lg bg-white outline-none outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
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
                                onClick={() => dispatch(closeModal())}
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
