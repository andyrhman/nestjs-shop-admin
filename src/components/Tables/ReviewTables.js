import React from 'react'
import Link from 'next/link';
import StarRatings from 'react-star-ratings';

import { EyeIcon } from "@heroicons/react/24/solid";

const ReviewTables = ({ count, user, product, comment, rating, info }) => {
    return (
        <>
            <td>{count}</td>
            <td>{user}</td>
            <td>{product}</td>
            <td>{comment.split(' ').length > 3 ? comment.split(' ').slice(0, 3).join(' ') + '...' : comment}</td>
            <td>
                {/* // ? https://www.phind.com/search?cache=m6wp1nf66qo61e6izl2zt74s */}
                <StarRatings
                    rating={rating}
                    starDimension="18px"
                    starSpacing="2px"
                    starRatedColor="gold"
                    starEmptyColor="gray"
                    numberOfStars={5}
                    name='rating'
                />
            </td>
            <td>
                <Link href={`reviews/${info}`} className="btn btn-sm btn-circle btn-info">
                    <EyeIcon strokeWidth={2} className="h-4 w-4" />
                </Link>
            </td>
        </>
    )
}

export default ReviewTables