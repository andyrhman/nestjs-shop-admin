import React from 'react'

const CartFilters = ({
    checkedCompleted,
    handleCompleted,
    checkedUncompleted,
    handleUncompleted,

    checkedDateNewest,
    handleDateCheckedNewest,
    checkedDateOldest,
    handleDateCheckedOldest,
}) => {
    return (
        <>
            {/* Price */}
            <div className="mb-4">
                <article className="prose">
                    <h4>Select Status</h4>
                </article>
                <div className='grid grid-cols-3 justify-between'>
                    <div className='join'>
                        <input
                            type="checkbox"
                            className="checkbox checkbox-sm"
                            checked={checkedCompleted}
                            onChange={handleCompleted}
                        />
                        <span className='pl-2'>Completed</span>
                    </div>
                    <div className='join'>
                        <input
                            type="checkbox"
                            className="checkbox checkbox-sm"
                            checked={checkedUncompleted}
                            onChange={handleUncompleted}
                        />
                        <span className='pl-2'>Uncompleted</span>
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
        </>
    )
}

export default CartFilters