import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

import Layout from '@/components/Layout'
import AdminWrapper from '@/components/AdminWrapper'
import UpdateOrder from '@/components/Forms/UpdateOrderStatus'
import ErrorAlert from '@/components/Alert/Error'

const UpdateOrderStatus = () => {
    const [status, setStatus] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (id) {
            (
                async () => {
                    try {
                        const { data } = await axios.get(`order-items/${id}`)
                        setStatus(data.status)
                    } catch (error) {
                        if (error.response && error.response.status === 401) {
                            router.push('/login');
                        }

                        if (error.response && error.response.status === 403) {
                            router.push('/login');
                        }

                        if (error.response && error.response.status === 404) {
                            router.push('/login');
                        }
                    }
                }
            )()
        }
    }, [id])

    const submit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`orders/${id}`, {
                status
            });
            sessionStorage.setItem('deleteSuccess', '1');
            router.push('/orders');
        } catch (error) {
            console.error(error.response);
            if (error.response && error.response.data && error.response.data.message) {
                const errorMessage = error.response.data.message;
                setError(errorMessage);
            }
        }
    }
    return (
        <Layout>
            <AdminWrapper>
                <ErrorAlert error={error} />
                <UpdateOrder
                    status={status}
                    statusChange={(e) => setStatus(e.target.value)}
                    submit={submit}
                />
            </AdminWrapper>
        </Layout>
    )
}

export default UpdateOrderStatus