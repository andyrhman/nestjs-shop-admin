import React from 'react'
import Image from 'next/image';
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

const UserTables = ({ id, fullName, username, email, number }) => {
    return (
        <>
            <tr key={id}>
                <td>{number}</td>
                <td>
                    <div className="flex items-center">
                        <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                                <Image src="https://via.placeholder.com/300" width={300} height={300} alt="Avatar Tailwind CSS Component" />
                            </div>
                        </div>
                        <div className="pl-2">
                            <div className="font-bold">{fullName}y</div>
                        </div>
                    </div>
                </td>
                <td>
                    {username}
                </td>
                <td>{email}</td>
            </tr>
        </>
    )
}

export default UserTables