import React from 'react'

const UpdateOrder = ({ status, statusChange, submit }) => {
    return (
        <>
            <div className="relative md:pt-24 pb-24 pt-12">
                <div className="px-4 md:px-10 mx-auto w-full">
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded light bg-white" >
                        <div className="rounded-t mb-0 px-4 py-3 border-0">
                            <div className="mb-4 flex items-center justify-between">
                                <div>
                                    <article className="prose">
                                        <h3>Update Order Status</h3>
                                    </article>
                                </div>
                            </div>
                        </div>
                        <div className="block w-full overflow-x-auto">
                            <form>
                                <div className='mb-5'>
                                    <label className="label">
                                        <span className="label-text">Change Status</span>
                                    </label>
                                    <select
                                        value={status}
                                        className="select select-bordered w-full max-w-full"
                                        onChange={statusChange}
                                    >
                                        <option value="Sedang Dikemas">Sedang Dikemas</option>
                                        <option value="Dikirim">Dikirim</option>
                                        <option value="Selesai">Selesai</option>
                                    </select>
                                </div>
                            </form>
                            <div className="mb-5 flex justify-center">
                                <button className="btn btn-success btn-wide" onClick={submit}>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdateOrder