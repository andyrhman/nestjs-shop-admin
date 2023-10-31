import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';
import http from '@/services/Api';

import Layout from '@/components/Layout'
import AdminWrapper from '@/components/AdminWrapper'
import ProductFilters from '@/components/Filters/ProductFilters';
import ProductTables from '@/components/Tables/ProductTables';
import DeleteModal from "@/components/Modals/Delete";
import TablePagination from '@mui/material/TablePagination';

import { PlusIcon, FunnelIcon } from "@heroicons/react/24/solid";
import { Slide, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Product = () => {
    // * Set filter
    const [showFilters, setShowFilters] = useState(false);
    const [products, setProducts] = useState([]);
    // const [total, setTotal] = useState('');

    const [page, setPage] = useState(0);
    const [perPage, setPerPage] = useState(10);

    const [filters, setFilters] = useState({
        s: ''
    })

    const router = useRouter();

    // * Price and Date
    const [checkedHighestPrice, setCheckedHighestPrice] = useState(false);
    const [checkedLowestPrice, setCheckedLowestPrice] = useState(false);

    const handleHighestPriceChecked = () => {
        setCheckedHighestPrice(!checkedHighestPrice);
        setCheckedLowestPrice(false); // Uncheck the other checkbox
    };

    const handleLowestPriceChecked = () => {
        setCheckedLowestPrice(!checkedLowestPrice);
        setCheckedHighestPrice(false); // Uncheck the other checkbox
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

    // * Category and Variant
    const [categories, setCategories] = useState([]);
    const [variants, setVariants] = useState([]);

    const handleCategoryChange = (e) => {
        const category = e.target.value;
        if (categories.includes(category)) {
            setCategories(categories.filter(c => c !== category));
        } else {
            setCategories([...categories, category]);
        }
    };

    const handleVariantChange = (e) => {
        const variant = e.target.value;
        if (variants.includes(variant)) {
            setVariants(variants.filter(v => v !== variant));
        } else {
            setVariants([...variants, variant]);
        }
    };
    useEffect(() => {
        (
            async () => {
                try {
                    const arr = [];
                    if (filters.s) {
                        arr.push(`search=${filters.s}`)
                    }
                    if (categories.length) {
                        arr.push(`filterByCategory=${categories.join(',')}`)
                    }
                    if (variants.length) {
                        arr.push(`filterByVariant=${variants.join(',')}`)
                    }
                    if (checkedHighestPrice) {
                        arr.push(`sortByPrice=asc`)
                    }
                    if (checkedLowestPrice) {
                        arr.push(`sortByPrice=desc`)
                    }
                    if (checkedNewestDate) {
                        arr.push(`sortByDate=newest`)
                    }
                    if (checkedOldestDate) {
                        arr.push(`sortByDate=oldest`)
                    }
                    const { data } = await http.get(`products?${arr.join('&')}`)
                    setProducts(data)

                    // setTotal(data.total)
                    // Reset to the first page after a search
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
    }, [filters, router, categories, variants, checkedHighestPrice, checkedLowestPrice, checkedNewestDate, checkedOldestDate])

    // * Showing the toast after deletion
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

    const search = (s) => {
        setFilters({
            ...filters,
            s
        })
    }

    // * Delete Modal
    const [productId, setProductId] = useState(null);
    const handleOpenDialog = () => document.getElementById('delete_modal').showModal();

    const handleConfirmDelete = async () => {
        await axios.delete(`product/${productId}`);
        setProducts(products.filter((u) => u.id !== productId));
        sessionStorage.setItem('deleteSuccess', '1');
        window.location.reload();
    };

    const del = (id) => {
        setProductId(id);
        handleOpenDialog();
    };

    return (
        <Layout>
            <AdminWrapper>
                <DeleteModal handleConfirmDelete={handleConfirmDelete} />
                <div className="relative md:pt-24 pb-24 pt-12">
                    <div className="px-4 md:px-10 mx-auto w-full">
                        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded light bg-white" >
                            <div className="rounded-t mb-0 px-4 py-3 border-0">
                                <div className="mb-8 flex items-center justify-between">
                                    <div>
                                        <article className="prose">
                                            <h3>Product List</h3>
                                        </article>
                                    </div>
                                    <div className="flex shrink-0 flex-col sm:flex-row">
                                        <Link
                                            href={'/products/create'}
                                            className="btn btn-neutral flex items-center"
                                        >
                                            <PlusIcon strokeWidth={2} className="h-4 w-4" /> Create Product
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-2 flex items-center justify-between">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="input input-bordered input-sm w-full max-w-full"
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
                                <ProductFilters
                                    checkedPrice={checkedHighestPrice}
                                    handlePriceChecked={() => handleHighestPriceChecked()}
                                    checkedPriceLow={checkedLowestPrice}
                                    handlePriceCheckedLow={() => handleLowestPriceChecked()}
                                    checkedDateNewest={checkedNewestDate}
                                    handleDateCheckedNewest={() => handleNewestDateChecked()}
                                    checkedDateOldest={checkedOldestDate}
                                    handleDateCheckedOldest={() => handleOldestDateChecked()}
                                    handleCategoryChange={handleCategoryChange}
                                    handleVariantChange={handleVariantChange}
                                />
                                : null
                            }

                            {/* table */}
                            <div className="block w-full overflow-x-auto">
                                <table className="table">
                                    {/* head */}
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Image & Title</th>
                                            <th>Description</th>
                                            <th>Price</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.slice(page * perPage, (page + 1) * perPage).map((p, index) => (
                                            <tr key={p.id}>
                                                <ProductTables
                                                    number={page * perPage + index + 1}
                                                    id={p.id}
                                                    title={p.title}
                                                    image={p.image}
                                                    description={p.description.split(' ').slice(0, 20).join(' ')}
                                                    price={p.price}
                                                    editId={`/dashboard/products/${p.id}`}
                                                    deleteId={() => del(p.id)}
                                                />
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <TablePagination
                                                count={products.length}
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
    )
}

export default Product