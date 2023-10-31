import React from 'react'

const ProductFilters = ({
    checkedPrice,
    handlePriceChecked,
    checkedPriceLow,
    handlePriceCheckedLow,
    
    checkedDateNewest,
    handleDateCheckedNewest,

    checkedDateOldest,
    handleDateCheckedOldest,

    handleCategoryChange,
    handleVariantChange
}) => {
    return (
        <>
            {/* Price */}
            <div className="mb-4">
                <article className="prose">
                    <h4>Select Price</h4>
                </article>
                <div className='grid grid-cols-3 justify-between'>
                    <div className='join'>
                        <input
                            type="checkbox"
                            className="checkbox checkbox-sm"
                            checked={checkedPrice}
                            onChange={handlePriceChecked}
                        />
                        <span className='pl-2'>Highest</span>
                    </div>
                    <div className='join'>
                        <input
                            type="checkbox"
                            className="checkbox checkbox-sm"
                            checked={checkedPriceLow}
                            onChange={handlePriceCheckedLow}
                        />
                        <span className='pl-2'>Lowest</span>
                    </div>
                </div>
            </div>

            {/* Date */}
            <div className="mb-4">
                <article className="prose">
                    <h4>Select Date</h4>
                </article>
                <div className='grid grid-cols-3 justify-between'>
                    <div className='join'>
                        <input
                            type="checkbox"
                            className="checkbox checkbox-sm"
                            checked={checkedDateNewest}
                            onChange={handleDateCheckedNewest}
                        />
                        <span className='pl-2'>Newest</span>
                    </div>
                    <div className='join'>
                        <input
                            type="checkbox"
                            className="checkbox checkbox-sm"
                            checked={checkedDateOldest}
                            onChange={handleDateCheckedOldest}
                        />
                        <span className='pl-2'>Oldest</span>
                    </div>
                </div>
            </div>

            {/* Category */}
            <div className="mb-4">
                <article className="prose">
                    <h4>Select Category</h4>
                </article>
                <div className='grid grid-cols-3 justify-between'>
                    <div className='join'>
                        <input type="checkbox" className="checkbox checkbox-sm" value='Electronics' onChange={handleCategoryChange} />
                        <span className='pl-2'>Electronics</span>
                    </div>
                    <div className='join'>
                        <input type="checkbox" className="checkbox checkbox-sm" value='Computer' onChange={handleCategoryChange} />
                        <span className='pl-2'>Computer</span>
                    </div>
                    <div className='join'>
                        <input type="checkbox" className="checkbox checkbox-sm" value="Handphone" onChange={handleCategoryChange} />
                        <span className='pl-2'>Handphone</span>
                    </div>
                    <div className='join'>
                        <input type="checkbox" className="checkbox checkbox-sm" value="Men Shoes" onChange={handleCategoryChange} />
                        <span className='pl-2'>Men Shoes</span>
                    </div>
                    <div className='join'>
                        <input type="checkbox" className="checkbox checkbox-sm" value="Food" onChange={handleCategoryChange} />
                        <span className='pl-2'>Food</span>
                    </div>
                </div>
            </div>

            {/* Variant */}
            <div className="mb-4">
                <article className="prose">
                    <h4>Select Variant</h4>
                </article>

                <div className='grid grid-cols-3 justify-between'>
                    <div className='join'>
                        <input type="checkbox" className="checkbox checkbox-sm" value="Fresh" onChange={handleVariantChange} />
                        <span className='pl-2'>Fresh</span>
                    </div>
                    <div className='join'>
                        <input type="checkbox" className="checkbox checkbox-sm" value="Concrete" onChange={handleVariantChange} />
                        <span className='pl-2'>Concrete</span>
                    </div>
                    <div className='join'>
                        <input type="checkbox" className="checkbox checkbox-sm" value="Plastic" onChange={handleVariantChange} />
                        <span className='pl-2'>Plastic</span>
                    </div>
                    <div className='join'>
                        <input type="checkbox" className="checkbox checkbox-sm" value="Soft" onChange={handleVariantChange} />
                        <span className='pl-2'>Soft</span>
                    </div>
                    <div className='join'>
                        <input type="checkbox" className="checkbox checkbox-sm" value="Cotton" onChange={handleVariantChange} />
                        <span className='pl-2'>Cotton</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductFilters