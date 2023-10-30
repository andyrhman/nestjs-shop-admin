import React from 'react'

const CreateProductForm = ({title, description, image, price}) => {
    return (
        <>
            <form>
                <div className='mb-5'>
                    <label className="label">
                        <span className="label-text">Title</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Products title"
                        className="input input-bordered w-full max-w-full"
                        onChange={title}
                    />
                </div>

                <div className='mb-5'>
                    <label className="label">
                        <span className="label-text">Description</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Products description"
                        className="input input-bordered w-full max-w-full"
                        onChange={description}
                    />
                </div>

                <div className='mb-5'>
                    <label className="label">
                        <span className="label-text">Image</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Products description"
                        className="input input-bordered w-full max-w-full"
                        onChange={image}
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
                        onChange={price}
                    />
                </div>
            </form>
        </>
    )
}

export default CreateProductForm