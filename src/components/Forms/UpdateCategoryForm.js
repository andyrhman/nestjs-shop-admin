import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { ArrowLeftCircleIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import axios from 'axios'
import ErrorAlert from '../Alert/Error';

const UpdateCategoryForm = () => {
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();
    const { id } = router.query;
    useEffect(() => {
        (
            async () => {
                try {
                    const { data } = await axios.get(`category/${id}`);
                    setName(data.name)
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
    }, [router]);
    const submit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`category/${id}`, {
                name
            })
            sessionStorage.setItem('createSuccess', '1');
            router.push('/categories')
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                const errorMessage = error.response.data.message;
                setError(errorMessage);
                window.scrollTo(0, 0);
            }
        }
    }
    return (
        <>
            <div className="relative md:pt-24 pb-24 pt-12">
                <div className="px-4 md:px-10 mx-auto w-full">
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded light bg-white" >
                        <div className="rounded-t mb-0 px-4 py-3 border-0">
                            <div className="mb-4 flex items-center justify-between">
                                <div>
                                    <article className="prose">
                                        <h3>Update Order Status</h3>
                                    </article>
                                </div>
                                <Link href={'/categories'} className="btn btn-sm btn-info text-white hover:text-blue-800">
                                    <ArrowLeftCircleIcon strokeWidth={2} className="h-4 w-4" />
                                    Back
                                </Link>
                            </div>
                        </div>
                        <div className="block w-full overflow-x-auto">
                            <ErrorAlert error={error} />
                            <form>
                                <div className='mb-5'>
                                    <label className="label">
                                        <span className="label-text">Category</span>
                                    </label>
                                    <input
                                        defaultValue={name}
                                        type="text"
                                        placeholder="Category Name"
                                        className="input input-bordered w-full max-w-full"
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                            </form>
                            <div className="mb-5 flex justify-center">
                                <button className="btn btn-success btn-wide" onClick={submit}>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdateCategoryForm