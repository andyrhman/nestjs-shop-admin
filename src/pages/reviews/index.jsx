import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

import Layout from '@/components/Layout'
import AdminWrapper from '@/components/AdminWrapper'
import ReviewTables from '@/components/Tables/ReviewTables'

const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    const router = useRouter();

    useEffect(() => {
        (
            async () => {
                try {
                    const { data } = await axios.get(`reviews`);
                    setReviews(data);
                } catch (error) {
                    if (error.response && error.response.status === 401) {
                        router.push('/login');
                    }

                    if (error.response && error.response.status === 403) {
                        router.push('/login');
                    }

                    if (error.response && error.response.status === 404) {
                        router.push('/login');
                    }
                }
            }
        )();
    }, [])

    return (
        <Layout>
            <AdminWrapper>
                <div className="relative md:pt-24 pb-24 pt-12">
                    <div className="px-4 md:px-10 mx-auto w-full">
                        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded light bg-white" >
                            <div className="rounded-t mb-0 px-4 py-3 border-0">
                                <div className="mb-4 flex items-center justify-between">
                                    <div>
                                        <article className="prose">
                                            <h3>Carts List</h3>
                                        </article>
                                    </div>
                                </div>
                            </div>
                            <div className="block w-full overflow-x-auto">
                                <table className='table'>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>User</th>
                                            <th>Product</th>
                                            <th>Comment</th>
                                            <th>Rating</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {reviews.map((r, index) => (
                                            <tr key={r.id}>
                                                <ReviewTables 
                                                    count={index + 1}
                                                    user={r.user.fullName}
                                                    product={r.product.title}
                                                    comment={r.comment}
                                                    rating={r.star}
                                                    info={r.id}
                                                />
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </AdminWrapper>
        </Layout>
    )
}

export default Reviews