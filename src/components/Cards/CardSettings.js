import React, { useState } from "react";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import ErrorAlert from "../Alert/Error";
import AddressNotExist from "../Alert/AddressNotExist";
import CreateAddressForm from "../Forms/CreateAddressForm";
import UpdateAddressForm from "../Forms/UpdateAddressForm";

const CardSettings = ({
    name,
    username,
    email,
    setName,
    setUsername,
    setEmail,
    setPassword,
    setConfirmPassword,
    submitInfo,
    submitPassword,
    error,
    nameError,
    usernameError,
    emailError,
    passwordError,
    confirmPasswordError,
    strength,
    strengthBarColor,
    strengthText,

    address,
    street,
    city,
    province,
    zip,
    country,
    phone,
    submitUpdateAddress,

    streetOnChange,
    cityOnChange,
    provinceOnChange,
    zipOnChange,
    countryOnChange,
    phoneOnChange,
    submitCreateAddress
}) => {
    const [showForm, setShowForm] = useState(false);
    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <div className="rounded-t bg-white mb-0 py-6">
                        <div className="text-center flex justify-between">
                            <h6 className="text-blueGray-700 text-xl font-bold">My account Info</h6>
                            <button
                                className="btn btn-sm btn-info"
                                type="button"
                                onClick={submitInfo}
                            >
                                <PencilSquareIcon strokeWidth={2} className="h-4 w-4" />
                                Update Info
                            </button>
                        </div>
                    </div>
                    <ErrorAlert error={error} />
                    <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                        User Information
                    </h6>
                    <form>
                        <div className="flex flex-wrap">
                            <div className="w-full lg:w-12/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                    >
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        className={
                                            nameError
                                                ? ("input input-bordered px-3 py-3 input-error placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150")
                                                : ("input input-bordered px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150")
                                        }
                                        defaultValue={name}
                                        onChange={setName}
                                    />
                                    {nameError && <div className="text-red-500 text-xs mt-1">{nameError}</div>}
                                </div>
                            </div>
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                    >
                                        Username
                                    </label>
                                    <input
                                        type="text"
                                        className={
                                            usernameError
                                                ? ("input input-bordered px-3 py-3 input-error placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150")
                                                : ("input input-bordered px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150")
                                        }
                                        defaultValue={username}
                                        onChange={setUsername}
                                    />
                                    {usernameError && <div className="text-red-500 text-xs mt-1">{usernameError}</div>}
                                </div>
                            </div>
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                    >
                                        Email address
                                    </label>
                                    <input
                                        type="email"
                                        className={
                                            emailError
                                                ? ("input input-bordered px-3 py-3 input-error placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150")
                                                : ("input input-bordered px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150")
                                        }
                                        defaultValue={email}
                                        onChange={setEmail}
                                    />
                                    {emailError && <div className="text-red-500 text-xs mt-1">{emailError}</div>}
                                </div>
                            </div>
                        </div>
                    </form>

                    <hr className="mt-6 border-b-1 border-blueGray-300" />
                    <div className="rounded-t bg-white mb-0 py-6">
                        <div className="text-center flex justify-between">
                            <h6 className="text-blueGray-700 text-xl font-bold">Change Password</h6>
                            <button
                                className="btn btn-sm btn-info"
                                type="button"
                                onClick={submitPassword}
                            >
                                <PencilSquareIcon strokeWidth={2} className="h-4 w-4" />
                                Update Password
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
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        className={
                                            passwordError
                                                ? ("input input-bordered px-3 py-3 input-error placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150")
                                                : ("input input-bordered px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150")
                                        }
                                        placeholder="Enter your password..."
                                        onChange={setPassword}
                                    />
                                    <div style={{
                                        fontSize: '12px',
                                        textAlign: 'right',
                                        color: strengthBarColor,
                                    }}>
                                        {strengthText}
                                    </div>
                                    <div style={{
                                        height: '10px',
                                        width: `${strength * 20}%`,
                                        backgroundColor: strengthBarColor,
                                        transition: 'width 0.3s ease-in-out',
                                    }} />
                                    {passwordError && <div className="text-red-500 text-xs mt-1">{passwordError}</div>}
                                </div>
                            </div>
                            <div className="w-full lg:w-12/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                    >
                                        Confirm Password
                                    </label>
                                    <input
                                        type="password"
                                        className={
                                            confirmPasswordError
                                                ? ("input input-bordered px-3 py-3 input-error placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150")
                                                : ("input input-bordered px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150")
                                        }
                                        placeholder="Enter your confirm password"
                                        onChange={setConfirmPassword}
                                    />
                                    {confirmPasswordError && <div className="text-red-500 text-xs mt-1">{confirmPasswordError}</div>}
                                </div>
                            </div>
                        </div>
                    </form>

                    <hr className="mt-6 border-b-1 border-blueGray-300" />
                    {/* Address Forms */}
                    {address.id ? (
                        <UpdateAddressForm
                            street={street}
                            city={city}
                            province={province}
                            zip={zip}
                            country={country}
                            phone={phone}
                            streetOnChange={streetOnChange}
                            cityOnChange={cityOnChange}
                            provinceOnChange={provinceOnChange}
                            zipOnChange={zipOnChange}
                            countryOnChange={countryOnChange}
                            phoneOnChange={phoneOnChange}
                            submitUpdateAddress={submitUpdateAddress}
                        />
                    ) : (
                        <>
                            {showForm ?
                                <CreateAddressForm
                                    streetOnChange={streetOnChange}
                                    cityOnChange={cityOnChange}
                                    provinceOnChange={provinceOnChange}
                                    zipOnChange={zipOnChange}
                                    countryOnChange={countryOnChange}
                                    phoneOnChange={phoneOnChange}
                                    submitCreateAddress={submitCreateAddress}
                                />
                                : <AddressNotExist showCreateAddress={() => setShowForm(!showForm)} />
                            }
                        </>
                    )}
                    <hr className="mt-6 border-b-1 border-blueGray-300" />
                </div>
            </div>
        </>
    );
}

export default CardSettings;