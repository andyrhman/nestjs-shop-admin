import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import Image from 'next/image';
import axios from 'axios';

// Materials
import TablePagination from '@mui/material/TablePagination';
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Slide, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components
import Layout from '@/components/Layout';
import AdminWrapper from '@/components/AdminWrapper';
import OrderTables from '@/components/Tables/OrderTables';
import OrderItems from '@/components/Modals/OrderItem';

const OrdersTable = () => {
    const [orders, setOrders] = useState([]);
    const [page, setPage] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const router = useRouter();
    const [filters, setFilters] = useState({
        s: ''
    })
    useEffect(() => {
        (
            async () => {
                try {
                    const arr = [];
                    if (filters.s) {
                        arr.push(`search=${filters.s}`)
                    }
                    const { data } = await axios.get(`orders?${arr.join('&')}`)
                    setOrders(data)
                    // Reset to the first page after a search
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
    }, [router, filters])


    // * Showing the toast
    useEffect(() => {
        const deleteSuccess = sessionStorage.getItem('deleteSuccess');
        if (deleteSuccess === '1') {
            // The page was just reloaded, display the toast:
            toast.success('Success', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Slide
            });
            // Clear the flag from sessionStorage so the toast isn't shown again on subsequent reloads
            sessionStorage.removeItem('deleteSuccess');
        }
    }, []);

    // * Code Reference Modal Open With DaisyUI
    // ? https://stackoverflow.com/questions/76508667/daisyui-modal-does-not-exist-on-type-window-of-type-globalthis
    // ? https://www.phind.com/search?cache=n2tfybvb8vite4s1lpr00ie5
    const myModal = React.useRef(null);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const handleOpenDialog = () => {
        if (myModal.current) {
            myModal.current.showModal();
            myModal.current.addEventListener('close', () => setSelectedOrder(null));
        }
    };

    const handleOpen = (order) => {
        setSelectedOrder(order);
    };

    useEffect(() => {
        if (selectedOrder) {
            handleOpenDialog();
        }
    }, [selectedOrder]);

    // * Find Orders
    const search = (s) => {
        setFilters({
            ...filters,
            s
        })
    }

    return (
        <Layout>
            <AdminWrapper>
                {selectedOrder && (
                    <OrderItems
                        openModal={myModal}
                        orderItems={selectedOrder.order_items}
                    />
                )}
                <div className="relative md:pt-24 pb-24 pt-12">
                    <div className="px-4 md:px-10 mx-auto w-full">
                        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded light bg-white" >
                            <div className="rounded-t mb-0 px-4 py-3 border-0">
                                <div className="mb-4 flex items-center justify-between">
                                    <div>
                                        <article className="prose">
                                            <h3>Orders List</h3>
                                        </article>
                                    </div>
                                </div>
                            </div>
                            <div className="join">
                                <input
                                    type="text"
                                    placeholder="Search for order and order item..."
                                    className="input input-sm input-bordered w-full max-w-full"
                                    onChange={(e) => search(e.target.value)}
                                />
                                <button className="btn btn-sm join-item btn-primary">
                                    <MagnifyingGlassIcon className="h-5 w-5" />
                                </button>
                            </div>
                            <div className="block w-full overflow-x-auto">
                                {orders.length > 0 ? (
                                    <>
                                        <table className="table">
                                            {/* head */}
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Name</th>
                                                    <th>Email</th>
                                                    <th>Total</th>
                                                    <th>Status</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                {orders.slice(page * perPage, (page + 1) * perPage).map((o, index) => (
                                                    <tr key={o.id}>
                                                        <OrderTables
                                                            number={page * perPage + index + 1}
                                                            fullName={o.name}
                                                            email={o.email}
                                                            total={o.total}
                                                            price={o.price}
                                                            orderItem={() => handleOpen(o)}
                                                            completed={o.completed}
                                                            
                                                        />
                                                    </tr>
                                                ))}
                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <TablePagination
                                                        count={orders.length}
                                                        page={page}
                                                        onPageChange={(e, newPage) => setPage(newPage)}
                                                        rowsPerPage={perPage}
                                                        rowsPerPageOptions={[10, 25, 50, 100]}
                                                        onRowsPerPageChange={(e) => setPerPage(parseInt(e.target.value))}
                                                    />
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </>
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

export default OrdersTable