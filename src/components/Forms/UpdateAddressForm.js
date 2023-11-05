import React from 'react'
import { PencilSquareIcon } from "@heroicons/react/24/solid";

const UpdateAddressForm = ({
    street,
    city,
    province,
    zip,
    country,
    phone,
    streetOnChange,
    cityOnChange,
    provinceOnChange,
    zipOnChange,
    countryOnChange,
    phoneOnChange,
    submitUpdateAddress
}) => {
    return (
        <>
            <div className="rounded-t bg-white mb-0 py-6">
                <div className="text-center flex justify-between">
                    <h6 className="text-blueGray-700 text-xl font-bold">Update Address</h6>
                    <button
                        className="btn btn-sm btn-info"
                        type="button"
                        onClick={submitUpdateAddress}
                    >
                        <PencilSquareIcon strokeWidth={2} className="h-4 w-4" />
                        Update
                    </button>
                </div>
            </div>
            <form>
                <div className="flex flex-wrap">
                    <div className="w-full lg:w-12/12 px-4">
                        <div className="relative w-full mb-3">
                            <label
                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            >
                                Street
                            </label>
                            <input
                                defaultValue={street}
                                type="text"
                                placeholder='Insert your street address'
                                className="input input-bordered px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                onChange={streetOnChange}
                            />
                        </div>
                    </div>
                    <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                            <label
                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            >
                                Country
                            </label>
                            <input
                                defaultValue={country}
                                type="text"
                                placeholder='Insert your country'
                                className="input input-bordered px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                onChange={countryOnChange}
                            />
                        </div>
                    </div>
                    <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                            <label
                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            >
                                City
                            </label>
                            <input
                                defaultValue={city}
                                type="text"
                                placeholder='Insert your city'
                                className="input input-bordered px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                onChange={cityOnChange}
                            />
                        </div>
                    </div>
                    <div className="w-full lg:w-4/12 px-4">
                        <div className="relative w-full mb-3">
                            <label
                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            >
                                Province
                            </label>
                            <input
                                defaultValue={province}
                                type="text"
                                placeholder='Insert your province'
                                className="input input-bordered px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                onChange={provinceOnChange}
                            />
                        </div>
                    </div>
                    <div className="w-full lg:w-4/12 px-4">
                        <div className="relative w-full mb-3">
                            <label
                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            >
                                Zip Code
                            </label>
                            <input
                                defaultValue={zip}
                                type="text"
                                placeholder='Insert your zip code'
                                className="input input-bordered px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                onChange={zipOnChange}
                            />
                        </div>
                    </div>
                    <div className="w-full lg:w-4/12 px-4">
                        <div className="relative w-full mb-3">
                            <label
                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            >
                                Phone Number
                            </label>
                            <input
                                defaultValue={phone}
                                type="text"
                                placeholder='Insert your phone number'
                                className="input input-bordered px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                onChange={phoneOnChange}
                            />
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default UpdateAddressForm