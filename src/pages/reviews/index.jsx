import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

import Layout from '@/components/Layout'
import AdminWrapper from '@/components/AdminWrapper'
import ReviewTables from '@/components/Tables/ReviewTables'
import TablePagination from '@mui/material/TablePagination';

const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    const [page, setPage] = useState(0);
    const [perPage, setPerPage] = useState(10);

    const [filters, setFilters] = useState({
        s: ''
    });
    const router = useRouter();

    useEffect(() => {
        (
            async () => {
                try {
                    const arr = [];
                    if (filters.s) {
                        arr.push(`search=${filters.s}`)
                    }
                    const { data } = await axios.get(`reviews?${arr.join('&')}`)
                    setReviews(data);
                    setPage(0);
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
                                {reviews.length > 0 ? (
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
                                            {reviews.slice(page * perPage, (page + 1) * perPage).map((r, index) => (
                                                <tr key={r.id}>
                                                    <ReviewTables
                                                        count={page * perPage + index + 1}
                                                        user={r.user.fullName}
                                                        product={r.product.title}
                                                        comment={r.comment}
                                                        rating={r.star}
                                                        info={r.id}
                                                    />
                                                </tr>
                                            ))}
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <TablePagination
                                                    count={reviews.length}
                                                    page={page}
                                                    onPageChange={(e, newPage) => setPage(newPage)}
                                                    rowsPerPage={perPage}
                                                    rowsPerPageOptions={[10, 25, 50, 100]}
                                                    onRowsPerPageChange={(e) => setPerPage(parseInt(e.target.value))}
                                                />
                                            </tr>
                                        </tfoot>
                                    </table>
                                ) : (
                                    <div className='flex flex-col justify-center items-center text-center py-10'>
                                        <img src="/images/undraw_taken_re_yn20.svg" alt="Not Found" className='mx-auto h-auto max-w-full rounded-lg' width={200} height={200} />
                                        <h4>No data found</h4>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </AdminWrapper>
        </Layout>
    )
}

export default Reviews