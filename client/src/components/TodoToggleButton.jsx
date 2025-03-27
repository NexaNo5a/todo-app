import { CheckIcon } from '@heroicons/react/24/outline';

export default function TodoToggleButton({ disabled, completed, onClick }) {
    const handleClick = (e) => {
        e.stopPropagation();
        onClick?.(e);
    };
    return (
        <button
            title='Complete'
            disabled={disabled}
            onClick={handleClick}
            className={`
        size-6 flex items-center justify-center rounded-full border 
        ${completed ? 'bg-indigo-600 border-indigo-600' : 'border-gray-400'} 
        transition-colors duration-200 hover:border-indigo-500
      `}
            aria-label="Toggle complete"
        >
            {completed && <CheckIcon className="text-white size-4" />}
        </button>
    );
}