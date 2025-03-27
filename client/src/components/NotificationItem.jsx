import { Transition } from '@headlessui/react'
import { useEffect, useState } from 'react'
import { XMarkIcon } from '@heroicons/react/20/solid'

export function NotificationItem({ id, message, actionLabel, onAction, onClose }) {
    const [show, setShow] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(false)
            setTimeout(onClose, 300) // 完全淡出后删除
        }, 3000)

        return () => clearTimeout(timer)
    }, [onClose])

    return (
        <Transition
            show={show}
            enter="transform transition duration-300 ease-out"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:translate-x-4 scale-95"
            enterTo="opacity-100 translate-y-0 sm:translate-x-0 scale-100"
            leave="transition-opacity duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >
            <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black/5">
                <div className="p-4">
                    <div className="flex items-center">
                        <div className="flex w-0 flex-1 justify-between">
                            <p className="w-0 flex-1 text-sm font-medium text-gray-900">{message}</p>
                            {actionLabel && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        onClose()
                                        onAction?.()
                                    }}
                                    className="ml-3 shrink-0 rounded-md bg-white text-sm font-medium text-indigo-600 hover:text-indigo-500"
                                >
                                    {actionLabel}
                                </button>
                            )}
                        </div>
                        <div className="ml-4 flex shrink-0">
                            <button
                                type="button"
                                onClick={() => setShow(false)}
                                className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500"
                            >
                                <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    )
}