import React, { useState, useEffect } from "react";
import TablePagination from '@mui/material/TablePagination';
import axios from "axios";
import { useRouter } from "next/router";

// components
import { Square3Stack3DIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import 'react-toastify/dist/ReactToastify.css';

// layout for page
import AdminWrapper from "@/components/AdminWrapper";
import UserTables from "@/components/Tables/UserTables";
import Layout from "@/components/Layout";
import { setUser } from "@/redux/actions/setUserAction";

export default function UsersTable() {
    const [total, setTotal] = useState('')
    const [users, setUsers] = useState([]);
    const [filters, setFilters] = useState({
        s: ''
    })

    const [page, setPage] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const router = useRouter()
    useEffect(() => {
        (
            async () => {
                try {
                    const arr = [];
                    if (filters.s) {
                        arr.push(`search=${filters.s}`)
                    }
                    const {data: total} = await axios.get('total-users');
                    setTotal(total.total);
                    const { data: user } = await axios.get(`users?${arr.join('&')}`);
                    setUsers(user);
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
        )();
    }, [filters, router])

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
                                <div className="mb-8 flex items-center justify-between">
                                    <div>
                                        <article className="prose">
                                            <h3>Users List</h3>
                                        </article>
                                    </div>
                                    <div className="flex shrink-0 flex-col sm:flex-row">
                                        <div
                                            className="btn btn-sm btn-info flex items-center"
                                        >
                                            <Square3Stack3DIcon strokeWidth={2} className="h-4 w-4" /> Total User {total}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="join">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="input input-bordered w-full max-w-full"
                                    onChange={(e) => search(e.target.value)}
                                />
                                <button className="btn join-item btn-primary">
                                    <MagnifyingGlassIcon className="h-5 w-5" />
                                </button>
                            </div>
                            <div className="block w-full overflow-x-auto">
                                <table className="table">
                                    {/* head */}
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Username</th>
                                            <th>Email</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.slice(page * perPage, (page + 1) * perPage).map((u, index) => (
                                            <UserTables
                                                key={u.id}
                                                number={page * perPage + index + 1}
                                                id={u.id}
                                                fullName={u.fullName}
                                                username={u.username}
                                                email={u.email}
                                            />
                                        ))}
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <TablePagination
                                                count={users.length}
                                                page={page}
                                                onPageChange={(e, newPage) => setPage(newPage)}
                                                rowsPerPage={perPage}
                                                rowsPerPageOptions={[10, 25, 50, 100]}
                                                onRowsPerPageChange={(e) => setPerPage(parseInt(e.target.value))}
                                            />
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </AdminWrapper>
        </Layout>
    );
}
