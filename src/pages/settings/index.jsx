import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import AdminWrapper from '@/components/AdminWrapper'
import CardSettings from '@/components/Cards/CardSettings'
import Layout from "@/components/Layout";
import http from '@/services/Api';
import axios from 'axios'

import 'react-toastify/dist/ReactToastify.css';
import { Slide, toast } from 'react-toastify';
import { connect } from "react-redux";

const Settings = ({ user }) => {
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [nameError, setNameError] = useState(false)
    const [emailError, setEmailError] = useState(false);
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [error, setError] = useState('');
    const [strength, setStrength] = useState(0);

    const [address, setAddress] = useState('');
    const [street, setStreet] = useState('');
    const [country, setCountry] = useState('');
    const [province, setProvince] = useState('');
    const [city, setCity] = useState('');
    const [zip, setZip] = useState('');
    const [phone, setPhone] = useState('');
    const router = useRouter();
    useEffect(() => {
        (
            async () => {
                try {
                    setName(user.fullName);
                    setUsername(user.username);
                    setEmail(user.email);
                } catch (error) {
                    if (error.response && error.response.status === 401) {
                        setError('An error occurred');
                        router.push('/login');
                    }
                }
            }
        )()
    }, [router, user]);

    useEffect(() => {
        (
            async () => {
                try {
                    const { data } = await http.get('address');
                    setAddress(data);
                    setStreet(data.street);
                    setCountry(data.country);
                    setProvince(data.province);
                    setCity(data.city);
                    setZip(data.zip);
                    setPhone(data.phone)
                } catch (error) {
                    if (error.response && error.response.status === 401) {
                        setError('An error occurred');
                        router.push('/login');
                    }
                }
            }
        )()
    }, [router])


    const submitInfo = async (e) => {
        e.preventDefault()
        try {
            await axios.put('info', {
                fullname: name,
                username,
                email
            });
            sessionStorage.setItem('updateSuccess', '1');
            window.location.reload();
        } catch (error) {
            console.error(error.response);
            if (error.response && error.response.data && error.response.data.message) {
                const errorMessage = error.response.data.message;
                setError(errorMessage);

                // Set error flags based on the error message
                if (errorMessage.includes('Name')) {
                    setNameError(errorMessage);
                }
                if (errorMessage.includes('Email')) {
                    setEmailError(errorMessage);
                }
                if (errorMessage.includes('Username')) {
                    setUsernameError(errorMessage);
                }
            }
        }
    }
    const submitPassword = async (e) => {
        e.preventDefault()
        try {
            await axios.put('password', {
                password,
                confirm_password: confirmPassword
            });
            sessionStorage.setItem('updateSuccess', '1');
            window.location.reload();
        } catch (error) {
            console.error(error.response);
            if (error.response && error.response.data && error.response.data.message) {
                const errorMessage = error.response.data.message;
                setError(errorMessage);

                // Set error flags based on the error message
                if (errorMessage.includes('Password')) {
                    setPasswordError(errorMessage);
                }
            }
        }
    }
    const submitCreateAddress = async (e) => {
        e.preventDefault();
        try {
            await http.post('address', {
                street,
                country,
                province,
                city,
                zip,
                phone
            });
            sessionStorage.setItem('updateSuccess', '1');
            window.location.reload();
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                const errorMessage = error.response.data.message;
                setError(errorMessage);
            }
        }
    }
    const submitUpdateAddress = async (e) => {
        e.preventDefault();
        try {
            await http.put('address', {
                street,
                country,
                province,
                city,
                zip,
                phone
            });
            sessionStorage.setItem('updateSuccess', '1');
            window.location.reload();
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                const errorMessage = error.response.data.message;
                setError(errorMessage);
            }
        }
    }

    function checkPasswordStrength(password) {
        let strength = 0;
        if (password.match(/[a-z]/)) strength++; // lower case letter
        if (password.match(/[A-Z]/)) strength++; // upper case letter
        if (password.match(/[0-9]/)) strength++; // number
        if (password.match(/[^a-zA-Z0-9]/)) strength++; // special character
        if (password.length >= 6) strength++; // length 8 or more
        return strength;
    }

    const validatePassword = (value) => {
        setPassword(value);
        setPasswordError('');
        const strength = checkPasswordStrength(value);
        setStrength(strength);

        if (!value) {
            setPasswordError('Password is required');
        } else if (value.length < 6) {
            setPasswordError('Password must be at least 6 characters long');
        }
    };
    const validateConfirmPassword = (value) => {
        setConfirmPassword(value);
        setConfirmPasswordError('');

        if (!value) {
            setConfirmPasswordError('Confirm Password is required');
        } else if (value !== password) {
            setConfirmPasswordError('Passwords do not match');
        }
    };

    const strengthBarColor = () => {
        switch (strength) {
            case 1: return 'red';
            case 2: return 'orange';
            case 3: return 'yellow';
            case 4: return 'lime';
            case 5: return 'green';
            default: return 'gray';
        }
    }

    const strengthText = () => {
        switch (strength) {
            case 1: return 'Too short';
            case 2: return 'Weak';
            case 3: return 'Okay';
            case 4: return 'Good';
            case 5: return 'Strong';
            default: return '';
        }
    }

    // * Showing the toast after deletion
    useEffect(() => {
        const updateSuccess = sessionStorage.getItem('updateSuccess');
        if (updateSuccess === '1') {
            // The page was just reloaded, display the toast:
            toast.success('Account info has been updated.', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Slide
            });
            // Clear the flag from sessionStorage so the toast isn't shown again on subsequent reloads
            sessionStorage.removeItem('updateSuccess');
        }
    }, []);
    return (
        <Layout>
            <AdminWrapper>
                <div className='flex flex-wrap md:pt-24 pb-24 pt-12'>
                    <CardSettings
                        name={name}
                        username={username}
                        email={email}
                        setName={(e) => setName(e.target.value)}
                        setUsername={(e) => setUsername(e.target.value)}
                        setEmail={(e) => setEmail(e.target.value)}
                        setPassword={(e) => validatePassword(e.target.value)}
                        setConfirmPassword={(e) => validateConfirmPassword(e.target.value)}
                        error={error}
                        nameError={nameError}
                        usernameError={usernameError}
                        emailError={emailError}
                        passwordError={passwordError}
                        confirmPasswordError={confirmPasswordError}
                        submitInfo={submitInfo}
                        submitPassword={submitPassword}
                        strength={strength}
                        strengthText={strengthText()}
                        strengthBarColor={strengthBarColor()}
                        address={address}
                        street={street}
                        city={city}
                        province={province}
                        zip={zip}
                        country={country}
                        phone={phone}
                        submitUpdateAddress={submitUpdateAddress}
                        streetOnChange={(e) => setStreet(e.target.value)}
                        cityOnChange={(e) => setCity(e.target.value)}
                        provinceOnChange={(e) => setProvince(e.target.value)}
                        zipOnChange={(e) => setZip(e.target.value)}
                        countryOnChange={(e) => setCountry(e.target.value)}
                        phoneOnChange={(e) => setPhone(e.target.value)}
                        submitCreateAddress={submitCreateAddress}
                    />
                </div>
            </AdminWrapper>
        </Layout>
    )
}

export default connect(
    (state) => {
        return {
            user: state.user.user
        }
    }
)(Settings);