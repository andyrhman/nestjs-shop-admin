import React from 'react'

const ShowProductForm = ({
    title,
    description,
    image,
    price,
    product_images,
    variants,
    category
}) => {
    return (
        <>
            <div className='mb-5'>
                <label className="label">
                    <span className="label-text">Title</span>
                </label>
                <div>
                    {title}
                </div>
            </div>

            <div className='mb-5'>
                <label className="label">
                    <span className="label-text">Description</span>
                </label>
                <div>
                    {description}
                </div>
            </div>

            <div className='mb-5'>
                <label className="label">
                    <span className="label-text">Category</span>
                </label>
                <div className="btn btn-sm btn-success">
                    {category}
                </div>
            </div>

            <div className='mb-5'>
                <label className="label">
                    <span className="label-text">Variants</span>
                </label>
                <div className="grid grid-cols-4 gap-4">
                    {variants.map((v, index) => (
                        <div className="btn btn-sm btn-info" key={index}>
                            {v.name}
                        </div>
                    ))}
                </div>
            </div>

            <div className='mb-5'>
                <label className="label">
                    <span className="label-text">Image</span>
                </label>
                <img src={image} width={200} height={200} className='h-auto max-w-full rounded-lg' />
            </div>

            <div className='mb-5'>
                <label className="label">
                    <span className="label-text">Multiple Image</span>
                </label>
                <div className="grid grid-cols-3 gap-4">
                    {product_images.map((i, index) => (
                        <div key={index}>
                            <img src={i.image} width={200} height={200} className='h-auto max-w-full rounded-lg' />
                        </div>
                    ))}
                </div>
            </div>

            <div className='mb-5'>
                <label className="label">
                    <span className="label-text">Price</span>
                </label>
                <div>
                    Rp{new Intl.NumberFormat('id-ID').format(price)}
                </div>
            </div>
        </>
    )
}

export default ShowProductForm