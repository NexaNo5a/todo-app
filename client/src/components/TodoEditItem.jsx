import { useState, useEffect } from 'react'
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    DialogTitle, Label, Listbox,
    ListboxButton,
    ListboxOption,
    ListboxOptions
} from '@headlessui/react'
import {CalendarIcon, ExclamationTriangleIcon, XMarkIcon} from '@heroicons/react/24/outline'
import {useDispatch, useSelector} from "react-redux";
import {closeItem, closeModal} from "../store/modalSlice";
import {TagIcon, UserCircleIcon} from "@heroicons/react/16/solid";
import classNames from "classnames";
import {updateTodo} from "../api/todoApi";
import { updateTodo as updateTodoAction} from '../store/todoSlice'

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

//open selected item on todolist
export default function TodoEditItem () {


    const isItemOpen = useSelector((state) => state.modal.isItemOpen);
    const { userId, token } = useSelector((state) => state.auth);
    const selectedTodo = useSelector((state) => state.modal.selectedTodo);
    const dispatch = useDispatch();
    const [assigned, setAssigned] = useState(assignees[0])
    const [labelled, setLabelled] = useState(labels[0])
    const [dated, setDated] = useState(dueDates[0])
    const [title, setTitle] = useState( '');
    const [description, setDescription] = useState( '');
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
    if (!isItemOpen) return null;

    return (
        <Dialog className="relative z-50" onClose={() => dispatch(closeItem())} open={isItemOpen}>
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel
                        transition
                        className="relative transform  rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                    >
                        <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                            <button
                                type="button"
                                onClick={() => dispatch(closeItem())}
                                className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                <span className="sr-only">Close</span>
                                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                            </button>
                        </div>
                        <div className="sm:flex sm:items-start">

                            <div className=" text-center sm:mx-0 sm:mt-6 sm:text-left flex-grow ">
                                <form action="#" className="relative">
                                    <div className="overflow-hidden rounded-lg border border-gray-300 shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
                                        <label htmlFor="title" className="sr-only">
                                            Title
                                        </label>
                                        <input
                                            id="title"
                                            name="title"
                                            type="text"
                                            value = {title}
                                            onChange={e => {setTitle(e.target.value)}}
                                            className="block w-full border-0 pt-2.5 text-lg font-medium placeholder:text-gray-400 focus:ring-0"
                                        />
                                        <label htmlFor="description" className="sr-only">
                                            Description
                                        </label>
                                        <textarea
                                            id="description"
                                            name="description"
                                            rows={2}
                                            value= {description}
                                            onChange={e => {setDescription(e.target.value)}}
                                            className="block w-full resize-none border-0 py-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"


                                        />

                                        {/* Spacer element to match the height of the toolbar */}
                                        <div aria-hidden="true">
                                            <div className="py-2">
                                                <div className="h-9" />
                                            </div>
                                            <div className="h-px" />
                                            <div className="py-2">
                                                <div className="py-px">
                                                    <div className="h-9" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="absolute inset-x-px bottom-0">
                                        {/* Actions: These are just examples to demonstrate the concept, replace/wire these up however makes sense for your project. */}
                                        <div className="flex flex-nowrap justify-end space-x-2 px-2 py-2 sm:px-3">
                                            <Listbox as="div" value={assigned} onChange={setAssigned} className="flex-shrink-0">
                                                <Label className="sr-only">Assign</Label>
                                                <div className="relative">
                                                    <ListboxButton className="relative inline-flex items-center whitespace-nowrap rounded-full bg-gray-50 px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 sm:px-3">
                                                        {assigned.value === null ? (
                                                            <UserCircleIcon aria-hidden="true" className="h-5 w-5 flex-shrink-0 text-gray-300 sm:-ml-1" />
                                                        ) : (
                                                            <img alt="" src={assigned.avatar} className="h-5 w-5 flex-shrink-0 rounded-full" />
                                                        )}

                                                        <span
                                                            className={classNames(
                                                                assigned.value === null ? '' : 'text-gray-900',
                                                                'hidden truncate sm:ml-2 sm:block',
                                                            )}
                                                        >
                                                      {assigned.value === null ? 'Assign' : assigned.name}
                                                    </span>
                                                    </ListboxButton>

                                                    <ListboxOptions
                                                        transition
                                                        className="absolute right-0  mt-1 max-h-56 w-52 overflow-auto rounded-lg bg-white py-3 text-base shadow ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
                                                    >
                                                        {assignees.map((assignee) => (
                                                            <ListboxOption
                                                                key={assignee.value}
                                                                value={assignee}
                                                                className="relative cursor-default select-none bg-white px-3 py-2 data-[focus]:bg-gray-100"
                                                            >
                                                                <div className="flex items-center">
                                                                    {assignee.avatar ? (
                                                                        <img alt="" src={assignee.avatar} className="h-5 w-5 flex-shrink-0 rounded-full" />
                                                                    ) : (
                                                                        <UserCircleIcon aria-hidden="true" className="h-5 w-5 flex-shrink-0 text-gray-400" />
                                                                    )}

                                                                    <span className="ml-3 block truncate font-medium">{assignee.name}</span>
                                                                </div>
                                                            </ListboxOption>
                                                        ))}
                                                    </ListboxOptions>
                                                </div>
                                            </Listbox>

                                            <Listbox as="div" value={labelled} onChange={setLabelled} className="flex-shrink-0">
                                                <Label className="sr-only">Add a label</Label>
                                                <div className="relative">
                                                    <ListboxButton className="relative inline-flex items-center whitespace-nowrap rounded-full bg-gray-50 px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 sm:px-3">
                                                        <TagIcon
                                                            aria-hidden="true"
                                                            className={classNames(
                                                                labelled.value === null ? 'text-gray-300' : 'text-gray-500',
                                                                'h-5 w-5 flex-shrink-0 sm:-ml-1',
                                                            )}
                                                        />
                                                        <span
                                                            className={classNames(
                                                                labelled.value === null ? '' : 'text-gray-900',
                                                                'hidden truncate sm:ml-2 sm:block',
                                                            )}
                                                        >
                  {labelled.value === null ? 'Label' : labelled.name}
                </span>
                                                    </ListboxButton>

                                                    <ListboxOptions
                                                        transition
                                                        className="absolute right-0  mt-1 max-h-56 w-52 overflow-auto rounded-lg bg-white py-3 text-base shadow ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
                                                    >
                                                        {labels.map((label) => (
                                                            <ListboxOption
                                                                key={label.value}
                                                                value={label}
                                                                className="relative z-50 cursor-default select-none bg-white px-3 py-2 data-[focus]:bg-gray-100"
                                                            >
                                                                <div className="flex items-center">
                                                                    <span className="block truncate font-medium">{label.name}</span>
                                                                </div>
                                                            </ListboxOption>
                                                        ))}
                                                    </ListboxOptions>
                                                </div>
                                            </Listbox>

                                            <Listbox as="div" value={dated} onChange={setDated} className="flex-shrink-0">
                                                <Label className="sr-only">Add a due date</Label>
                                                <div className="relative">
                                                    <ListboxButton className="relative inline-flex items-center whitespace-nowrap rounded-full bg-gray-50 px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 sm:px-3">
                                                        <CalendarIcon
                                                            aria-hidden="true"
                                                            className={classNames(
                                                                dated.value === null ? 'text-gray-300' : 'text-gray-500',
                                                                'h-5 w-5 flex-shrink-0 sm:-ml-1',
                                                            )}
                                                        />
                                                        <span
                                                            className={classNames(
                                                                dated.value === null ? '' : 'text-gray-900',
                                                                'hidden truncate sm:ml-2 sm:block',
                                                            )}
                                                        >
                  {dated.value === null ? 'Due date' : dated.name}
                </span>
                                                    </ListboxButton>

                                                    <ListboxOptions
                                                        transition
                                                        className="absolute right-0  mt-1 max-h-56 w-52 overflow-auto rounded-lg bg-white py-3 text-base shadow ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
                                                    >
                                                        {dueDates.map((dueDate) => (
                                                            <ListboxOption
                                                                key={dueDate.value}
                                                                value={dueDate}
                                                                className="relative cursor-default select-none bg-white px-3 py-2 data-[focus]:bg-gray-100"
                                                            >
                                                                <div className="flex items-center">
                                                                    <span className="block truncate font-medium">{dueDate.name}</span>
                                                                </div>
                                                            </ListboxOption>
                                                        ))}
                                                    </ListboxOptions>
                                                </div>
                                            </Listbox>
                                        </div>
                                    </div>
                                        </form>
                            </div>
                        </div>
                        <div className="mt-5 sm:mt-4 sm:flex  sm:flex-row-reverse">

                            <button
                                type="button"
                                onClick={handleSave}
                                className=" inline-flex w-full justify-center rounded-md bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                            >
                                Save
                            </button>
                            <button
                                type="button"
                                onClick={() => dispatch(closeItem())}
                                className=" mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset  ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
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
