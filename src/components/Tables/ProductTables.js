import React from 'react';
import Link from 'next/link';
import { TrashIcon, PencilSquareIcon, EyeIcon } from "@heroicons/react/24/solid";

const ProductTables = ({ number, image, title, description, price, editId, deleteId, showP }) => {
    return (
        <>

            <td>{number}</td>
            <td>
                <div className="flex items-center">
                    <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                            <img src={image} alt="Avatar Tailwind CSS Component" />
                        </div>
                    </div>
                    <div className="pl-2">
                        <div className="font-bold">{title}</div>
                    </div>
                </div>
            </td>
            <td>
                {description.split(' ').length > 7 ? description.split(' ').slice(0, 7).join(' ') + '...' : description}
            </td>
            <td>Rp{new Intl.NumberFormat('id-ID').format(price)}</td>
            <td>
                <Link href={showP} className="btn btn-sm btn-circle btn-info">
                    <EyeIcon strokeWidth={2} className="h-4 w-4" />
                </Link>
                <Link href={editId} className="btn btn-sm btn-circle btn-primary">
                    <PencilSquareIcon strokeWidth={2} className="h-4 w-4" />
                </Link>
                <button className="btn btn-sm btn-circle btn-error" onClick={deleteId}>
                    <TrashIcon strokeWidth={2} className="h-4 w-4" />
                </button>
            </td>
        </>
    )
}

export default ProductTables