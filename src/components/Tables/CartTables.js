import React from 'react'

const CartTables = ({ user, product, price, quantity, status, index }) => {
    return (
        <>
            <td>{index}</td>
            <td>{user}</td>
            <td>{product}</td>
            <td>Rp{new Intl.NumberFormat('id-ID').format(price)}</td>
            <td>{quantity}</td>
            {status === true ? (
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
        </>
    )
}

export default CartTables