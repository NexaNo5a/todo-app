import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from '../store/modalSlice';
const TodoFormModal = () => {
    const isOpen = useSelector((state) => state.modal.isOpen);
    const dispatch = useDispatch();

    if (!isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center z-50" >
                <div
                    id="modal"
                    className="bg-white p-6 rounded-lg shadow-lg z-10 transition-transform transform scale-95 opacity-0 animate-modal-enter"
                >
                    <h2 className="text-xl mb-4">Animated Modal</h2>
                    <p className="mb-4">This modal has an animation effect.</p>
                    <button
                        onClick={() => dispatch(closeModal())}
                        className="px-4 py-2 bg-red-600 text-white"
                    >
                        Close
                    </button>
                </div>
            </div>
            <style jsx>{`
                @keyframes modal-enter {
                    from {
                        transform: scale(0.95);
                        opacity: 0;
                    }
                    to {
                        transform: scale(1);
                        opacity: 1;
                    }
                }
                .animate-modal-enter {
                    animation: modal-enter 0.3s ease-out forwards;
                }
            `}</style>
        </>
    );
};

export default TodoFormModal;