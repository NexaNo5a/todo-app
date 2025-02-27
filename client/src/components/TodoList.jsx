import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import {useDispatch} from "react-redux";
import {openItem, openModal} from "../store/modalSlice";
import {useEffect} from "react";



function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const TodoList = ({todos}) => {
    const dispatch = useDispatch();
    const handleEdit = (todo) => {
        console.log('Edit clicked todo:--------',todo)
        dispatch(openItem(todo))
    }
    useEffect(() => {

    },[todos])
    return (
        <ul role="list" className="divide-y divide-gray-100 w-1/2 relative">
            {todos.map((todo) => (
                <li key={todo._id} className="flex items-center justify-between gap-x-6 py-5 hover:cursor-pointer" onClick= {()=>handleEdit(todo)}>
                    <div className="min-w-0">
                        <div className="flex items-start gap-x-3">
                            <p className="text-sm font-semibold leading-6 text-gray-900">{todo.title}</p>

                        </div>
                        <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                            <p className="text-sm font-semibold leading-6 text-gray-900">{todo.description}</p>

                        </div>
                    </div>
                    <div className="flex flex-none items-center gap-x-4 hover:bg-gray-50 rounded-md p-1" onClick={(e)=>{e.stopPropagation()}}>

                        <Menu as="div" className="relative flex-none">
                            <MenuButton className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                                <span className="sr-only">Open options</span>
                                <EllipsisVerticalIcon aria-hidden="true" className="h-5 w-5" />
                            </MenuButton>
                            <MenuItems
                                transition
                                className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                            >
                                <MenuItem>
                                    <a href="#" className="block px-3 py-1 text-sm leading-6 text-gray-900 data-[focus]:bg-gray-50">
                                        Edit<span className="sr-only">, {todo.title}</span>
                                    </a>
                                </MenuItem>
                                <MenuItem>
                                    <a href="#" className="block px-3 py-1 text-sm leading-6 text-gray-900 data-[focus]:bg-gray-50">
                                        Move<span className="sr-only">, {todo.title}</span>
                                    </a>
                                </MenuItem>
                                <MenuItem>
                                    <a href="#" className="block px-3 py-1 text-sm leading-6 text-gray-900 data-[focus]:bg-gray-50">
                                        Delete<span className="sr-only">, {todo.title}</span>
                                    </a>
                                </MenuItem>
                            </MenuItems>
                        </Menu>
                    </div>
                </li>
            ))}
        </ul>
    )
}
export default TodoList;