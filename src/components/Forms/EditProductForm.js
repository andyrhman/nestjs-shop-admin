import React, { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import { PencilSquareIcon } from "@heroicons/react/24/solid";

import axios from 'axios'
import ImageUploads from '../Uploads/ImageUploads';
import MultipleImageUploads from '../Uploads/MultipleImagesUpload';
import ErrorAlert from '../Alert/Error';

const EditProductForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
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
                        setCategory(data.category)
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
            await axios.put((`product-images/${id}`),{
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
        <>
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
                        className="select select-bordered w-full max-w-full"
                        onChange={(e) => setCategoryID(e.target.value)}
                    >
                        <option disabled defaultValue={category.id}>{category.name}</option>
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

        </>
    )
}

export default EditProductForm