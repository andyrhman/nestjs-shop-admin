import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { TrashIcon, PlusIcon } from "@heroicons/react/24/solid";

import axios from 'axios';
import ErrorAlert from '../Alert/Error'
import MultipleImageUploads from '@/components/Uploads/MultipleImagesUpload'
import ImageUploads from '@/components/Uploads/ImageUploads'

const CreateProductForm = ({ }) => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [category, setCategory] = useState('')
    const [images, setImages] = useState([]);
    const [variants, setVariants] = useState(['']);
    const [price, setPrice] = useState('');

    const [error, setError] = useState('');
    const router = useRouter();

    const addImages = (urls) => {
        setImages(prevImages => [...prevImages, ...urls]);
    }
    const addVariant = () => {
        setVariants(prevVariants => [...prevVariants, '']); // Add a blank string
    }

    const updateVariant = (index, value) => {
        setVariants(prevVariants => prevVariants.map((v, i) => i === index ? value : v));
    }

    const removeVariant = (index) => {
        setVariants(prevVariants => prevVariants.filter((v, i) => i !== index));
    }
    const submit = async (e) => {
        e.preventDefault();
        setError('');

        // Validate variants
        if (variants.some(v => v.trim() === '')) {
            setError('Variant should not be empty');
            window.scrollTo(0, 0);
            return;
        }

        try {
            await axios.post('products', {
                title,
                description,
                image,
                images,
                price,
                variants,
                category
            })
            sessionStorage.setItem('deleteSuccess', '1');
            router.push('/products')
        } catch (error) {
            console.error(error.response);
            if (error.response && error.response.data && error.response.data.message) {
                const errorMessage = error.response.data.message;
                setError(errorMessage);
                window.scrollTo(0, 0);
            }
        }
    }
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
    }, [router])


    return (
        <>
            <ErrorAlert error={error} />
            <form>
                <div className='mb-5'>
                    <label className="label">
                        <span className="label-text">Title</span>
                    </label>
                    <input
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
                    <select
                        className="select select-bordered w-full max-w-full"
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option disabled selected>Select Category</option>
                        {categories?.map((c) => {
                            return <option key={c.id} value={c.id}>{c.name}</option>
                        })}
                    </select>
                </div>

                {variants.map((variant, index) => (
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

                <div className='mb-5'>
                    <label className="label">
                        <span className="label-text">Image</span>
                    </label>
                    {image ? <img src={image} alt='image' width={200} height={200} className='h-auto max-w-full rounded-lg' /> : null}
                    <input
                        className='hidden'
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    />
                    <ImageUploads uploaded={setImage} />
                </div>

                <div className='mb-5'>
                    <label className="label">
                        <span className="label-text">Choose Multiple Images</span>
                    </label>
                    <div className="grid grid-cols-3 gap-4">
                        {images.map((img, index) =>
                            <div key={index}>
                                <img src={img} alt={`image-${index}`} width={200} height={200} className='h-auto max-w-full rounded-lg' />
                            </div>
                        )}
                    </div>
                    <MultipleImageUploads uploaded={addImages} />
                    <textarea
                        className='hidden'
                        value={images.join('\n')}
                        onChange={(e) => setImages(e.target.value)}
                        readOnly
                    />
                </div>

                <div className='mb-5'>
                    <label className="label">
                        <span className="label-text">Price</span>
                    </label>
                    <input
                        type="number"
                        placeholder="Insert the price"
                        min={1}
                        className="input input-bordered w-full max-w-full"
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
            </form>
            <div className="mb-5 flex justify-center">
                <button className="btn btn-success btn-wide" onClick={submit}>Submit</button>
            </div>
        </>
    )
}

export default CreateProductForm