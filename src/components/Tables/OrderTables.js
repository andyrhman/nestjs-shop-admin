import React from 'react';
import { ShoppingBagIcon } from "@heroicons/react/24/solid";

const OrderTables = ({ number, fullName, email, total, orderItem, completed }) => {
    return (
        <>
            <td>{number}</td>
            <td>
                {fullName}
            </td>
            <td>
                {email}
            </td>
            <td>Rp{new Intl.NumberFormat('id-ID').format(total)}</td>
            {completed === true ? (
                <>
                    <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-green-600'>
                        <i className='fas fa-circle mr-2 text-green-600' />
                        Finished
                    </td>
                </>
            ) : (
                <>
                    <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-yellow-600'>
                    <i className='fas fa-circle mr-2 text-yellow-600' />
                        Unfinished
                    </td>
                </>
            )}
            <td>
                <button className="btn btn-circle btn-primary" onClick={orderItem}>
                    <ShoppingBagIcon strokeWidth={2} className="h-4 w-4" />
                </button>
            </td>
        </>
    )
}

export default OrderTables