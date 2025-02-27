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
                className="fixed inset-0  bg-opacity-50 z-50"
            >

                    <div className="relative top-10 left-2 max-w-xs  rounded-3xl bg-white text-sm/6 shadow-lg ring-1 ring-gray-900/5 "
                         onClick={(e) => e.stopPropagation()}
                    >
                        <div className="grid grid-cols-1  gap-y-2">
                            {solutions.map((item) => (
                                <div key={item.name} className="group relative flex gap-x-2 rounded-lg p-2 hover:bg-gray-50">
                                    <div className="mt-1 flex size-5 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                        <item.icon aria-hidden="true" className="size-4 text-gray-600 group-hover:text-indigo-600" />
                                    </div>
                                    <div className="items-center justify-center" >
                                        <a href={item.href} className="font-semibold text-gray-900">
                                            {item.name}
                                            <span className="absolute inset-0" />
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
            </div>
        </>

    )
}
