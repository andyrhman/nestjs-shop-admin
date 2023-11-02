import React from 'react';
import { ShoppingBagIcon } from "@heroicons/react/24/solid";

const OrderTables = ({ number, fullName, email, total, orderItem }) => {
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
            <td>
                <button className="btn btn-circle btn-primary" onClick={orderItem}>
                    <ShoppingBagIcon strokeWidth={2} className="h-4 w-4" />
                </button>
            </td>
        </>
    )
}

export default OrderTables