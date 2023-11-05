import React from 'react'
import Link from "next/link";

const AddressNotExist = ({showCreateAddress}) => {
    return (
        <div className="flex flex-col items-center max-w-sm mx-auto text-center">
            <p className="p-3 text-sm font-medium text-blue-500 rounded-full bg-blue-50">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
            </p>
            <h1 className="text-xl font-semibold text-gray-800 md:text-xl">Address does not exists</h1>
            <p className="text-gray-500 dark:text-gray-400">Please create an address, by clicking this button below</p>

            <div className="flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto">
                <button
                    className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600"
                    onClick={showCreateAddress}
                >
                    <span>Create Address</span>
                </button>
            </div>
        </div>
    )
}

export default AddressNotExist