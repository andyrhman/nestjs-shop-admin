import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import http from '@/services/Api'
import Layout from '@/components/Layout'
import ShowProductForm from '@/components/Forms/ShowProductForm'
import AdminWrapper from '@/components/AdminWrapper'

const ShowProduct = () => {
    const [product, setProduct] = useState('');
    const [multipleImg, setMultipleImg] = useState([]);
    const [variants, setVariants] = useState([]);

    const router = useRouter();
    const {slug} = router.query;
    useEffect(() => {
        if (slug) {
            (
                async () => {
                    try {
                        const {data} = await http.get(`product/${slug}`)
                        setProduct(data);
                        setMultipleImg(data.product_images);
                        setVariants(data.variant)
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
            )();
        }
    }, [slug])
    
    return (
        <Layout>
            <AdminWrapper>
                <div className="relative md:pt-24 pb-24 pt-12">
                    <div className="px-4 md:px-10 mx-auto w-full">
                        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded light bg-white" >
                            <div className="rounded-t mb-0 px-4 py-3 border-0">
                                <div className="mb-8 flex items-center justify-between">
                                    <div>
                                        <article className="prose">
                                            <h3>Product Info</h3>
                                        </article>
                                    </div>
                                </div>
                            </div>
                            <div className="block w-full overflow-x-auto">
                                <ShowProductForm
                                    title={product.title}
                                    description={product.description}
                                    image={product.image}
                                    price={product.price}
                                    product_images={multipleImg}
                                    variants={variants}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </AdminWrapper>
        </Layout>
    )
}

export default ShowProduct