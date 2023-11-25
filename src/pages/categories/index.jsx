import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import axios from 'axios'
import Layout from '@/components/Layout'
import AdminWrapper from '@/components/AdminWrapper'
import SEO from '@/components/SEO'

import Link from 'next/link'
import CategoryTables from '@/components/Tables/CategoryTables'
import DeleteModal from '@/components/Modals/Delete'
import 'react-toastify/dist/ReactToastify.css';
import { Slide, toast } from 'react-toastify';
import { PlusIcon } from '@heroicons/react/24/solid'

const Categories = () => {
    const pageTitle = `Category | ${process.env.siteTitle}`
    const [categories, setCategories] = useState([]);
    const router = useRouter();
    useEffect(() => {
        (
            async () => {
                try {
                    const { data } = await axios.get('categories');
                    setCategories(data);
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
    }, [router])

    // * Showing the toast after deletion
    useEffect(() => {
        const createSuccess = sessionStorage.getItem('createSuccess');
        if (createSuccess === '1') {
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
            sessionStorage.removeItem('createSuccess');
        }
    }, []);
    // * Delete Modal
    const [categoryId, setCategoryId] = useState(null);
    const handleOpenDialog = () => document.getElementById('delete_modal').showModal();

    const handleConfirmDelete = async () => {
        await axios.delete(`category/${categoryId}`);
        setCategories(categories.filter((u) => u.id !== categoryId));
        sessionStorage.setItem('createSuccess', '1');
        window.location.reload();
    };

    const del = (id) => {
        setCategoryId(id);
        handleOpenDialog();
    };
    return (
        <Layout>
            <SEO title={pageTitle} />
            <AdminWrapper>
                <DeleteModal handleConfirmDelete={handleConfirmDelete} />
                <div className="relative md:pt-24 pb-24 pt-12">
                    <div className="px-4 md:px-10 mx-auto w-full">
                        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded light bg-white" >
                            <div className="rounded-t mb-0 px-4 py-3 border-0">
                                <div className="mb-8 flex items-center justify-between">
                                    <div>
                                        <article className="prose">
                                            <h3>Category List</h3>
                                        </article>
                                    </div>
                                    <div className="flex shrink-0 flex-col sm:flex-row">
                                        <Link
                                            href={'/categories/create'}
                                            className="btn btn-neutral flex items-center"
                                        >
                                            <PlusIcon strokeWidth={2} className="h-4 w-4" /> Create Category
                                        </Link>
                                    </div>
                                </div>

                                <div className="block w-full overflow-x-auto">
                                    {categories.length > 0 ? (
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Category</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <CategoryTables
                                                    categories={categories}
                                                    del={del}
                                                />
                                            </tbody>
                                        </table>
                                    ) : (
                                        <div className='flex flex-col justify-center items-center text-center py-10'>
                                            <Image src="/images/undraw_taken_re_yn20.svg" alt="Not Found" className='mx-auto w-full h-52 rounded-lg' width={0} height={0} priority />
                                            <h4>No data found</h4>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AdminWrapper>
        </Layout>
    )
}

export default Categories