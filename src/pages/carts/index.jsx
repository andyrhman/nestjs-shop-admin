import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import Image from 'next/image';
import axios from 'axios';

// Materials
import TablePagination from '@mui/material/TablePagination';
import { FunnelIcon } from "@heroicons/react/24/solid";

import Layout from '@/components/Layout'
import AdminWrapper from '@/components/AdminWrapper'
import CartTables from '@/components/Tables/CartTables';
import CartFilters from '@/components/Filters/CartFilters';

const Carts = () => {
    const [carts, setCarts] = useState([]);
    const router = useRouter();

    const [page, setPage] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const [filters, setFilters] = useState({
        s: ''
    })
    // * Set filter
    const [showFilters, setShowFilters] = useState(false);
    // * Price and Date
    const [checkedByCompleted, setCheckedByCompleted] = useState(false);
    const [checkedByUncompleted, setCheckedByUncompleted] = useState(false);

    const handleCompleted = () => {
        setCheckedByCompleted(!checkedByCompleted);
        setCheckedByUncompleted(false); // Uncheck the other checkbox
    };

    const handleUncompleted = () => {
        setCheckedByUncompleted(!checkedByUncompleted);
        setCheckedByCompleted(false); // Uncheck the other checkbox
    };

    const [checkedNewestDate, setCheckedNewestDate] = useState(false);
    const [checkedOldestDate, setCheckedOldestDate] = useState(false);

    const handleNewestDateChecked = () => {
        setCheckedNewestDate(!checkedNewestDate);
        setCheckedOldestDate(false); // Uncheck the other checkbox
    };

    const handleOldestDateChecked = () => {
        setCheckedOldestDate(!checkedOldestDate);
        setCheckedNewestDate(false); // Uncheck the other checkbox
    };
    useEffect(() => {
        (
            async () => {
                try {
                    const arr = [];
                    if (filters.s) {
                        arr.push(`search=${filters.s}`)
                    }
                    if (checkedByCompleted) {
                        arr.push(`sortByCompleted=desc`)
                    }
                    if (checkedByUncompleted) {
                        arr.push(`sortByCompleted=asc`)
                    }
                    if (checkedNewestDate) {
                        arr.push(`sortByDate=newest`)
                    }
                    if (checkedOldestDate) {
                        arr.push(`sortByDate=oldest`)
                    }
                    const { data } = await axios.get(`carts?${arr.join('&')}`);
                    setCarts(data);
                    setPage(0);
                } catch (error) {
                    if (error.response && error.response.status === 401) {
                        router.push('/login');
                    }

                    if (error.response && error.response.status === 403) {
                        router.push('/login');
                    }
                }
            }
        )()
    }, [router, filters, checkedByCompleted, checkedByUncompleted, checkedNewestDate, checkedOldestDate])

    // * Find carts
    const search = (s) => {
        setFilters({
            ...filters,
            s
        })
    }
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
                            <div className="join">
                                <input
                                    type="text"
                                    placeholder="Search for user carts"
                                    className="input input-sm input-bordered w-full max-w-full"
                                    onChange={(e) => search(e.target.value)}
                                />
                                <div className="flex shrink-0 flex-col sm:flex-row">
                                    <button
                                        className="btn btn-sm btn-outline flex items-center"
                                        onClick={() => setShowFilters(!showFilters)}
                                    >
                                        <FunnelIcon strokeWidth={2} className="h-4 w-4" /> Filter
                                    </button>
                                </div>
                            </div>
                            {/* Filter */}
                            {showFilters ?
                                <CartFilters
                                    checkedCompleted={checkedByCompleted}
                                    handleCompleted={() => handleCompleted()}
                                    checkedUncompleted={checkedByUncompleted}
                                    handleUncompleted={() => handleUncompleted()}
                                    checkedDateNewest={checkedNewestDate}
                                    handleDateCheckedNewest={() => handleNewestDateChecked()}
                                    checkedDateOldest={checkedOldestDate}
                                    handleDateCheckedOldest={() => handleOldestDateChecked()}
                                />
                                : null
                            }
                            <div className="block w-full overflow-x-auto ">
                                {carts.length > 0 ? (
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>User Name</th>
                                                <th>Product</th>
                                                <th>Price</th>
                                                <th>Quantity</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {carts.slice(page * perPage, (page + 1) * perPage).map((c, index) => (
                                                <tr key={c.id}>
                                                    <CartTables
                                                        index={page * perPage + index + 1}
                                                        user={c.user.fullName}
                                                        product={c.product_title}
                                                        price={c.price}
                                                        quantity={c.quantity}
                                                        status={c.completed}
                                                    />
                                                </tr>
                                            ))}
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <TablePagination
                                                    count={carts.length}
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
                                        <Image src="/images/undraw_taken_re_yn20.svg" alt="Not Found" className='mx-auto w-full h-52 rounded-lg' width={0} height={0} priority/>
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

export default Carts