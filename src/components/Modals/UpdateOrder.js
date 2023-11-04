import React, { useEffect } from 'react';

const UpdateOrder = () => {
    useEffect(() => {
        const modal = document.getElementById('update_order');
    
        if (modal) {
          modal.showModal();
        }
      }, []);
    return (
        <>
            <dialog className="modal" id="update_order">
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
                            <tr>
                                <td colSpan={4}>Hello</td>
                            </tr>
                        </tbody>
                    </table>

                </div>
            </dialog>
        </>
    )
}

export default UpdateOrder