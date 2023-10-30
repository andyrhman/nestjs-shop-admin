import React from 'react'

const OrderItems = ({ orderItems, openModal }) => {
    return (
        <>
            <dialog className="modal" ref={openModal}>
                <div className="modal-box w-11/12 max-w-5xl">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg">Order Items</h3>
                    <table className="table">
                        <thead className='text-lg'>
                            <tr>
                                <th>#</th>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody className='text-lg'>
                            {orderItems.map((item, index) => (
                                <tr key={item.id}>
                                    <td>{index + 1}</td>
                                    <td>{item.product_title}</td>
                                    <td>Rp{10 * item.price}</td>
                                    <td>{item.quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            </dialog>
        </>
    )
}

export default OrderItems