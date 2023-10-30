import React from 'react'

const EditProductForm = ({ 
    titleV, 
    descriptionV, 
    imageV, 
    priceV,
    titleC, 
    descriptionC, 
    imageC, 
    priceC,
    submit 
}) => {
    return (
        <>
            <form>
                <div className='mb-5'>
                    <label className="label">
                        <span className="label-text">Title</span>
                    </label>
                    <input
                        defaultValue={titleV}
                        type="text"
                        placeholder="Products title"
                        className="input input-bordered w-full max-w-full"
                        onChange={titleC}
                    />
                </div>

                <div className='mb-5'>
                    <label className="label">
                        <span className="label-text">Description</span>
                    </label>
                    <input
                        defaultValue={descriptionV}
                        type="text"
                        placeholder="Products description"
                        className="input input-bordered w-full max-w-full"
                        onChange={descriptionC}
                    />
                </div>

                <div className='mb-5'>
                    <label className="label">
                        <span className="label-text">Image</span>
                    </label>
                    <input
                        defaultValue={imageV}
                        type="text"
                        placeholder="Products description"
                        className="input input-bordered w-full max-w-full"
                        onChange={imageC}
                    />
                </div>

                <div className='mb-5'>
                    <label className="label">
                        <span className="label-text">Price</span>
                    </label>
                    <input
                        defaultValue={priceV}
                        type="number"
                        placeholder="Insert the price"
                        min={1}
                        className="input input-bordered w-full max-w-full"
                        onChange={priceC}
                    />
                </div>
            </form>
            <div className="mb-5 flex justify-center">
                <button className="btn btn-success btn-wide" onClick={submit}>Submit</button>
            </div>
        </>
    )
}

export default EditProductForm