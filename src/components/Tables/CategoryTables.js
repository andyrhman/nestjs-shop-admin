import React from 'react'
import Link from 'next/link'
import { TrashIcon, PencilSquareIcon } from '@heroicons/react/24/solid'

const CategoryTables = ({ categories, del }) => {
  return (
    <>
      {categories.map((c, index) => (
        <tr key={c.id}>
          <td>
            {index + 1}
          </td>
          <td>
            {c.name}
          </td>
          <td>
            <Link href={`/categories/${c.id}`} className="btn btn-sm btn-circle btn-primary">
              <PencilSquareIcon strokeWidth={2} className="h-4 w-4" />
            </Link>
            <button className="btn btn-sm btn-circle btn-error" onClick={() => del(c.id)}>
              <TrashIcon strokeWidth={2} className="h-4 w-4" />
            </button>
          </td>
        </tr>
      ))}
    </>
  )
}

export default CategoryTables