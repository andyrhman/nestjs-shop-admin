import React from 'react'
import dynamic from 'next/dynamic';

const StarRatings = dynamic(() => import('react-star-ratings'), { ssr: false });

const ShowReviewForm = ({ user, product, comment, rating }) => {
    return (
        <>
            <div className='mb-5'>
                <label className="label">
                    <span className="label-text">User</span>
                </label>
                <div>
                    {user}
                </div>
            </div>

            <div className='mb-5'>
                <label className="label">
                    <span className="label-text">Product</span>
                </label>
                <div>
                    {product}
                </div>
            </div>

            <div className='mb-5'>
                <label className="label">
                    <span className="label-text">Rating</span>
                </label>
                <div>
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
                </div>
            </div>

            <div className='mb-5'>
                <label className="label">
                    <span className="label-text">Comment</span>
                </label>
                <div>
                    {comment}
                </div>
            </div>
        </>
    )
}

export default ShowReviewForm