import React, { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'

import { ArrowLeftCircleIcon } from "@heroicons/react/24/solid";

import Link from 'next/link';
import axios from 'axios'
import ErrorAlert from '@/components/Alert/Error'
import ImageUploads from '@/components/Uploads/ImageUploads'
import MultipleImageUploads from '@/components/Uploads/MultipleImagesUpload'
import Layout from '@/components/Layout'
import AdminWrapper from '@/components/AdminWrapper'
import DeleteModal from '@/components/Modals/Delete';

import { PencilSquareIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Slide, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditProduct = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState('');
    const [category_id, setCategoryID] = useState('');

    const [images, setImages] = useState([]);
    const [variants, setVariants] = useState([]);

    const [addVariants, setAddVariants] = useState([]);
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

    // * Update variants
    const addVariant = () => {
        setAddVariants(prevVariants => [...prevVariants, '']); // Add a blank string
    }

    const updateVariant = (index, value) => {
        setAddVariants(prevVariants => prevVariants.map((v, i) => i === index ? value : v));
    }

    const removeVariant = (index) => {
        setAddVariants(prevVariants => prevVariants.filter((v, i) => i !== index));
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
                    }
                }
            )();
        }
    }, [router, id])

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
                }
            }
        )()
    }, [router])

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

    // * Update Product
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
            });
            sessionStorage.setItem('deleteSuccess', '1');
            window.location.reload();
        } catch (error) {
            console.error(error.response);
            if (error.response && error.response.data && error.response.data.message) {
                const errorMessage = error.response.data.message;
                setError(errorMessage);
            }
        }
    }

    // * Update Multi Images
    const submitImages = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await axios.put((`product-images/${id}`), {
                images: addMultiImages
            });
            sessionStorage.setItem('deleteSuccess', '1');
            window.location.reload();
        } catch (error) {
            console.error(error.response);
            if (error.response && error.response.data && error.response.data.message) {
                const errorMessage = error.response.data.message;
                setError(errorMessage);
            }
        }
    }

    // * Update Variants
    const submitVariants = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await axios.put(`product-variants/${id}`, {
                variants: addVariants
            });
            sessionStorage.setItem('deleteSuccess', '1');
            window.location.reload();
        } catch (error) {
            console.error(error.response);
            if (error.response && error.response.data && error.response.data.message) {
                const errorMessage = error.response.data.message;
                setError(errorMessage);
            }
        }
    }

    // * Delete Images and Variants
    // ? https://www.phind.com/search?cache=r7azxctmdb966zr3xxmm8zrp
    const [itemId, setItemId] = useState(null);
    const [itemType, setItemType] = useState(null); // 'image' or 'variant'
    const handleOpenDialog = () => document.getElementById('delete_modal').showModal();

    const del = (e, id, type) => {
        e.preventDefault();
        setItemId(id);
        setItemType(type);
        handleOpenDialog();
    };

    const handleConfirmDelete = async () => {
        try {
            if (itemType === 'image') {
                await axios.delete(`product-images/${itemId}`);
                setImages(images.filter((i) => i.id !== itemId));
            } else if (itemType === 'variant') {
                await axios.delete(`product-variants/${itemId}`);
                setVariants(variants.filter((v) => v.id !== itemId));
            }
            sessionStorage.setItem('deleteSuccess', '1');
            window.location.reload();
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                const errorMessage = error.response.data.message;
                setError(errorMessage);
            }
        }
    };

    return (
        <Layout>
            <AdminWrapper>
                <DeleteModal handleConfirmDelete={handleConfirmDelete} />
                <div className="relative md:pt-24 pb-24 pt-12">
                    <div className="px-4 md:px-10 mx-auto w-full">
                        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded light bg-white" >
                            <div className="block w-full overflow-x-auto">
                                <ErrorAlert error={error} />
                                <div className="rounded-t bg-white mb-0 py-6">
                                    <div className="text-center flex justify-between">
                                        <Link href={'/products'} className="btn btn-sm btn-info text-white hover:text-blue-800">
                                            <ArrowLeftCircleIcon strokeWidth={2} className="h-4 w-4" />
                                            Back
                                        </Link>
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
                                        <textarea
                                            defaultValue={description}
                                            className="textarea textarea-bordered w-full max-w-full"
                                            placeholder="Products description"
                                            onChange={(e) => setDescription(e.target.value)}
                                        >
                                        </textarea>
                                    </div>

                                    <div className='mb-5'>
                                        <label className="label">
                                            <span className="label-text">Category</span>
                                        </label>
                                        {/* 
                                            * Follow this and do not change anything or modify the code
                                            // * There would be a problem in your code if you modify it
                                            // ? Trust me i got an error when i update the product because i modify the code
                                        */}
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
                                        <img src={image} width={200} height={200} className='h-auto max-w-full rounded-lg' alt={title}/>
                                        <input
                                            className='hidden'
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
                                                <div className='flex flex-col items-center justify-center' key={index}>
                                                    <img src={i.image} width={200} height={200} className='h-auto max-w-full rounded-lg' alt={`image-${index}`}/>
                                                    <button className="btn btn-sm btn-outline btn-circle btn-error" onClick={(e) => del(e, i.id, 'image')}>
                                                        <TrashIcon strokeWidth={2} className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            ))}
                                            {addMultiImages.map((img, index) => (
                                                <div key={index}>
                                                    <img src={img} alt={`image-${index}`} width={200} height={200} className='h-auto max-w-full rounded-lg' />
                                                </div>
                                            ))}
                                        </div>
                                        <MultipleImageUploads uploaded={addImages} />
                                        <textarea
                                            className='hidden'
                                            value={addMultiImages.join('\n')}
                                            onChange={(e) => setAddImages(e.target.value)}
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
                                        <div className="grid grid-cols-4 gap-4 mb-2">
                                            {variants.map((v, index) => (
                                                <div className='flex flex-col items-center justify-center' key={index}>
                                                    {v.name}
                                                    <button className="btn btn-sm btn-outline btn-circle btn-error" onClick={(e) => del(e, v.id, 'variant')}>
                                                        <TrashIcon strokeWidth={2} className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                        {addVariants.map((variant, index) => (
                                            <div key={index} className='mb-5'>
                                                <label className="label">
                                                    <span className="label-text">Variant {index + 1}</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    value={variant}
                                                    placeholder="Products Variants"
                                                    onChange={(e) => updateVariant(index, e.target.value)}
                                                    className="input input-bordered w-full max-w-full"
                                                />
                                                {variants.length > 1 && <button className="btn btn-sm btn-error mt-2 float-right" onClick={(e) => { e.preventDefault(); removeVariant(index); }}><TrashIcon strokeWidth={2} className="h-4 w-4" /></button>}
                                            </div>
                                        ))}
                                        <button className="btn btn-sm btn-primary" onClick={(e) => { e.preventDefault(); addVariant(); }}><PlusIcon strokeWidth={2} className="h-4 w-4" />Add variant</button>
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