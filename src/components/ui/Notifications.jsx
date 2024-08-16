import { useEffect } from 'react';
import { Icons } from '../Icons';

export default function Notifications({ children }) {
    useEffect(() => {
        const toast = document.getElementById('toast-wrapper');
        toast.classList.remove('hidden');
        setTimeout(() => {
            toast.classList.add('hidden');
        }, 3000);
    }, [children]);

    return <div id="toast-wrapper">{children}</div>;
}

const Success = ({ message }) => {
    if (!message) return null;

    return (
        <div
            id="toast-success"
            className="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
            role="alert"
        >
            <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                <Icons.Success w="w-5 h-5" />
                <span className="sr-only">Check icon</span>
            </div>
            <div className="ms-3 text-sm font-normal">{message}</div>
            <button
                type="button"
                className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                dataDismissTarget="#toast-success"
                aria-label="Close"
            >
                <span className="sr-only">Close</span>
                <Icons.Close w="w-5 h-5" />
            </button>
        </div>
    );
};

const Error = ({ message }) => {
    return (
        <div
            id="toast-danger"
            className="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
            role="alert"
        >
            <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
                <Icons.Error />
                <span className="sr-only">Error icon</span>
            </div>
            <div className="ms-3 text-sm font-normal">{message}</div>
            <button
                type="button"
                className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                dataDismissTarget="#toast-danger"
                ariaLabel="Close"
            >
                <span className="sr-only">Close</span>
                <Icons.Close />
            </button>
        </div>
    );
};

Notifications.Success = Success;
Notifications.Error = Error;
