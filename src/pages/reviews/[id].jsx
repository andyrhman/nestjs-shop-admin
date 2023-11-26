import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link';
import { useRouter } from 'next/router'

import { ArrowLeftCircleIcon } from "@heroicons/react/24/solid";

import Layout from '@/components/Layout'
import AdminWrapper from '@/components/AdminWrapper'
import ShowReviewForm from '@/components/Forms/ShowReviewForm'

const ReviewInfo = () => {
    const [review, setReview] = useState('');
    const [user, setUser] = useState('');
    const [product, setProduct] = useState('');

    const router = useRouter();
    const { id } = router.query;
    useEffect(() => {
        if (id) {
            (
                async () => {
                    try {
                        const { data } = await axios.get(`reviews/${id}`)
                        setReview(data);
                        setUser(data.user.fullName);
                        setProduct(data.product.title);
                    } catch (error) {
                        if (error.response && error.response.status === 401) {
                            router.push('/login');
                        }

                        if (error.response && error.response.status === 403) {
                            router.push('/login');
                        }
                    }
                }
            )();
        }
    }, [id])
    return (
        <Layout>
            <AdminWrapper>
                <div className="relative md:pt-24 pb-24 pt-12">
                    <div className="px-4 md:px-10 mx-auto w-full">
                        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded light bg-white" >
                            <div className="rounded-t mb-0 px-4 py-3 border-0">
                                <div className="mb-8 flex items-center justify-between">
                                    <div>
                                        <article className="prose">
                                            <h3>Review Info</h3>
                                        </article>
                                    </div>
                                    <Link href={'/reviews'} className="btn btn-sm btn-info text-white hover:text-blue-800">
                                        <ArrowLeftCircleIcon strokeWidth={2} className="h-4 w-4" />
                                        Back
                                    </Link>
                                </div>
                            </div>
                            <div className="block w-full overflow-x-auto">
                                <ShowReviewForm
                                    user={user}
                                    product={product}
                                    rating={review.star}
                                    comment={review.comment}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </AdminWrapper>
        </Layout>
    )
}

export default ReviewInfo