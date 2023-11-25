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
    getVariants,
    getCategories,
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
                    {getCategories.map((c) => (
                        <div className='join' key={c.id}>
                            <input type="checkbox" className="checkbox checkbox-sm" value={c.name} onChange={handleCategoryChange} />
                            <span className='pl-2'>{c.name}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Variant */}
            <div className="mb-4">
                <article className="prose">
                    <h4>Select Variant</h4>
                </article>
                <div className='grid grid-cols-3 justify-between'>
                    {getVariants.map((v) => (
                        <div className='join' key={v.id}>
                            <input type="checkbox" className="checkbox checkbox-sm" value={v.name} onChange={handleVariantChange} />
                            <span className='pl-2'>{v.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default ProductFilters