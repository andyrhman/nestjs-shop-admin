import React from 'react'

const ProductDetails = ({ product, openModal }) => {
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
                                <th>Product</th>
                                <th>Price</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody className='text-lg'>

                            <tr key={product.id}>                         
                                <td>{product.title}</td>
                                <td>Rp{new Intl.NumberFormat('id-ID').format(product.price)}</td>
                                <td>{product.image}</td>
                            </tr>

                        </tbody>
                    </table>

                </div>
            </dialog>
        </>
    )
}

export default ProductDetails