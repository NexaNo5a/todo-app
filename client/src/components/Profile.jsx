import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import {
    ArrowPathIcon,
    ChartPieIcon,
    CursorArrowRaysIcon,
    DocumentChartBarIcon,
    FingerPrintIcon,
    SquaresPlusIcon,
} from '@heroicons/react/24/outline'

import { useSelector, useDispatch} from "react-redux";
import { closeProfile} from "../store/modalSlice";

const solutions = [
    { name: 'Analytics', description: 'Get a better understanding of your traffic', href: '#', icon: ChartPieIcon },
    {
        name: 'Integrations',
        description: 'Connect with third-party tools and find out expectations',
        href: '#',
        icon: SquaresPlusIcon,
    },
    {
        name: 'Engagement',
        description: 'Speak directly to your customers with our engagement tool',
        href: '#',
        icon: CursorArrowRaysIcon,
    },
    { name: 'Automations', description: 'Build strategic funnels that will convert', href: '#', icon: ArrowPathIcon },
    { name: 'Security', description: "Your customers' data will be safe and secure", href: '#', icon: FingerPrintIcon },
    {
        name: 'Reports',
        description: 'Edit, manage and create newly informed decisions',
        href: '#',
        icon: DocumentChartBarIcon,
    },
]

export default function Profile() {
    const dispatch = useDispatch();
    const isProfileOpen = useSelector((state) => state.modal.isProfileOpen);
    if (!isProfileOpen) return null;
    const handleClose = (e) => {
        if (e.target.id === "modal-overlay") {
            dispatch(closeProfile());
        }
    }
    return (
        <>
            <div
                id="modal-overlay"
                onClick={handleClose}
                className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50"
            >

                    <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm/6 shadow-lg ring-1 ring-gray-900/5 lg:max-w-3xl"
                         onClick={(e) => e.stopPropagation()}
                    >
                        <div className="grid grid-cols-1 gap-x-6 gap-y-1 p-4 lg:grid-cols-2">
                            {solutions.map((item) => (
                                <div key={item.name} className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                                    <div className="mt-1 flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                        <item.icon aria-hidden="true" className="size-6 text-gray-600 group-hover:text-indigo-600" />
                                    </div>
                                    <div>
                                        <a href={item.href} className="font-semibold text-gray-900">
                                            {item.name}
                                            <span className="absolute inset-0" />
                                        </a>
                                        <p className="mt-1 text-gray-600">{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="bg-gray-50 px-8 py-6">
                            <div className="flex items-center gap-x-3">
                                <h3 className="text-sm/6 font-semibold text-gray-900">Enterprise</h3>
                                <p className="rounded-full bg-indigo-600/10 px-2.5 py-1.5 text-xs font-semibold text-indigo-600">New</p>
                            </div>
                            <p className="mt-2 text-sm/6 text-gray-600">Empower your entire team with even more advanced tools.</p>
                        </div>
                    </div>
            </div>
        </>

    )
}
