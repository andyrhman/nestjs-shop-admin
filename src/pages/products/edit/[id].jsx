import React, { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import { PencilSquareIcon } from "@heroicons/react/24/solid";

import axios from 'axios'
import ErrorAlert from '@/components/Alert/Error'
import ImageUploads from '@/components/Uploads/ImageUploads'
import MultipleImageUploads from '@/components/Uploads/MultipleImagesUpload'
import Layout from '@/components/Layout'
import AdminWrapper from '@/components/AdminWrapper'
import EditProductForm from '@/components/Forms/EditProductForm'

const EditProduct = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState('');
    const [category_id, setCategoryID] = useState('');

    const [images, setImages] = useState([]);
    const [variants, setVariants] = useState([]);

    const [addMultiImages, setAddImages] = useState([]);

    const [error, setError] = useState('')
    const router = useRouter();
    const { id } = router.query;

    // * Update image
    const ref = useRef(null);
    const updateImage = (url) => {
        if (ref.current) {
            ref.current.value = url;
        }
        setImage(url);
    }

    // * Update Multi Images
    const addImages = (urls) => {
        setAddImages(prevImages => [...prevImages, ...urls]);
    }
    useEffect(() => {
        if (id) {
            (
                async () => {
                    try {
                        const { data } = await axios.get(`product/${id}`);
                        setTitle(data.title);
                        setDescription(data.description);
                        setImage(data.image);
                        setPrice(data.price);
                        setImages(data.product_images);
                        setVariants(data.variant);
                        setCategoryID(data.category.id)
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
        }
    }, [id])

    const [categories, setCategories] = useState([]);
    useEffect(() => {
        (
            async () => {
                try {
                    const { data } = await axios.get('categories')
                    setCategories(data)
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
        )()
    }, [])

    const submitProduct = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await axios.put(`product/${id}`, {
                title,
                description,
                image,
                price,
                category_id
            })
            window.location.reload();
        } catch (error) {
            console.error(error.response);
            if (error.response && error.response.data && error.response.data.message) {
                const errorMessage = error.response.data.message;
                setError(errorMessage);
            }
        }
    }

    const submitImages = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await axios.put((`product-images/${id}`), {
                images: addMultiImages
            })
            window.location.reload();
        } catch (error) {
            console.error(error.response);
            if (error.response && error.response.data && error.response.data.message) {
                const errorMessage = error.response.data.message;
                setError(errorMessage);
            }
        }
    }

    const submitVariants = async (e) => {
        e.preventDefault();
        setError('');
        try {

            window.location.reload();
        } catch (error) {
            console.error(error.response);
            if (error.response && error.response.data && error.response.data.message) {
                const errorMessage = error.response.data.message;
                setError(errorMessage);
            }
        }
    }
    return (
        <Layout>
            <AdminWrapper>
                <div className="relative md:pt-24 pb-24 pt-12">
                    <div className="px-4 md:px-10 mx-auto w-full">
                        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded light bg-white" >
                            <div className="block w-full overflow-x-auto">
                                <ErrorAlert error={error} />
                                <div className="rounded-t bg-white mb-0 py-6">
                                    <div className="text-center flex justify-between">
                                        <h6 className="text-blueGray-700 text-xl font-bold">Update Products</h6>
                                        <button
                                            className="btn btn-sm btn-info"
                                            onClick={submitProduct}
                                        >
                                            <PencilSquareIcon strokeWidth={2} className="h-4 w-4" />
                                            Update
                                        </button>
                                    </div>
                                </div>
                                <form>
                                    <div className='mb-5'>
                                        <label className="label">
                                            <span className="label-text">Title</span>
                                        </label>
                                        <input
                                            defaultValue={title}
                                            type="text"
                                            placeholder="Products title"
                                            className="input input-bordered w-full max-w-full"
                                            onChange={(e) => setTitle(e.target.value)}
                                        />
                                    </div>

                                    <div className='mb-5'>
                                        <label className="label">
                                            <span className="label-text">Description</span>
                                        </label>
                                        <input
                                            defaultValue={description}
                                            type="text"
                                            placeholder="Products description"
                                            className="input input-bordered w-full max-w-full"
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
                                    </div>

                                    <div className='mb-5'>
                                        <label className="label">
                                            <span className="label-text">Category</span>
                                        </label>
                                        <select
                                            value={category_id}
                                            className="select select-bordered w-full max-w-full"
                                            onChange={(e) => setCategoryID(e.target.value)}
                                        >
                                            {categories?.map((c) => {
                                                return <option key={c.id} value={c.id}>{c.name}</option>
                                            })}
                                        </select>
                                    </div>

                                    <div className='mb-5'>
                                        <label className="label">
                                            <span className="label-text">Image</span>
                                        </label>
                                        <img src={image} width={200} height={200} className='h-auto max-w-full rounded-lg' />
                                        <input
                                            ref={ref}
                                            defaultValue={image}
                                            onChange={(e) => setImage(e.target.value)}
                                        />
                                        <ImageUploads uploaded={updateImage} />
                                    </div>

                                    <div className='mb-5'>
                                        <label className="label">
                                            <span className="label-text">Price</span>
                                        </label>
                                        <input
                                            defaultValue={price}
                                            type="number"
                                            placeholder="Insert the price"
                                            min={1}
                                            className="input input-bordered w-full max-w-full"
                                            onChange={(e) => setPrice(e.target.value)}
                                        />
                                    </div>
                                </form>

                                {/* Update Multi Images */}
                                <div className="rounded-t bg-white mb-0 py-6">
                                    <div className="text-center flex justify-between">
                                        <h6 className="text-blueGray-700 text-xl font-bold">Update Multiple Images</h6>
                                        <button
                                            className="btn btn-sm btn-info"
                                            type="button"
                                            onClick={submitImages}
                                        >
                                            <PencilSquareIcon strokeWidth={2} className="h-4 w-4" />
                                            Update
                                        </button>
                                    </div>
                                </div>
                                <form>
                                    <div className='mb-5'>
                                        <label className="label">
                                            <span className="label-text">Choose Multiple Image</span>
                                        </label>
                                        <div className="grid grid-cols-3 gap-4 mb-2">
                                            {images.map((i, index) => (
                                                <div key={index}>
                                                    <img src={i.image} width={200} height={200} className='h-auto max-w-full rounded-lg' />
                                                </div>
                                            ))}
                                        </div>
                                        <MultipleImageUploads uploaded={addImages} />
                                        <textarea
                                            value={addMultiImages.join('\n')}
                                            onChange={(e) => setImages(e.target.value)}
                                            readOnly
                                        />
                                    </div>
                                </form>

                                {/* Update Variants */}
                                <div className="rounded-t bg-white mb-0 py-6">
                                    <div className="text-center flex justify-between">
                                        <h6 className="text-blueGray-700 text-xl font-bold">Update Variants</h6>
                                        <button
                                            className="btn btn-sm btn-info"
                                            type="button"
                                            onClick={submitVariants}
                                        >
                                            <PencilSquareIcon strokeWidth={2} className="h-4 w-4" />
                                            Update
                                        </button>
                                    </div>
                                </div>
                                <form>
                                    <div className='mb-5'>
                                        <label className="label">
                                            <span className="label-text">Variants</span>
                                        </label>
                                        <div className="grid grid-cols-4 gap-4">
                                            {variants.map((v, index) => (
                                                <div key={index}>
                                                    {v.name}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </AdminWrapper>
        </Layout>
    )
}

export default EditProduct