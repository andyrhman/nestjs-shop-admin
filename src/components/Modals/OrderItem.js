import React from 'react'
import Link from 'next/link';
import { PencilSquareIcon } from "@heroicons/react/24/solid";

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
                                <th>Status</th>
                                <th>Update Status</th>
                            </tr>
                        </thead>
                        <tbody className='text-lg'>
                            {orderItems.map((item, index) => (
                                <tr key={item.id}>
                                    <td>{index + 1}</td>
                                    <td>{item.product_title}</td>
                                    <td>Rp{new Intl.NumberFormat('id-ID').format(item.price)}</td>
                                    <td>{item.quantity}</td>
                                    <td
                                        className={`border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ${item.status === "Sedang Dikemas"
                                            ? "text-purple-500"
                                            : item.status === "Dikirim"
                                                ? "text-blue-500"
                                                : "text-green-500"
                                            }`}
                                    >
                                        <i className={`fas fa-circle mr-2 ${item.status === "Sedang Dikemas" ? "text-purple-500" : item.status === "Dikirim" ? "text-blue-500" : "text-green-500"}`}></i>
                                        {item.status}
                                    </td>
                                    <td className='text-center'>
                                        <Link href={`/orders/${item.id}`} className="btn btn-sm btn-circle btn-primary">
                                            <PencilSquareIcon strokeWidth={2} className="h-4 w-4" />
                                        </Link>
                                    </td>
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