import React from 'react'
import Layout from '@/components/Layout'
import AdminWrapper from '@/components/AdminWrapper'
import SEO from '@/components/SEO'
import UpdateCategoryForm from '@/components/Forms/UpdateCategoryForm'

const UpdateCategory = () => {
    const pageTitle = `Edit Category | ${process.env.siteTitle}`
    return (
        <Layout>
            <SEO title={pageTitle} />
            <AdminWrapper>
                <UpdateCategoryForm/>
            </AdminWrapper>
        </Layout>
    )
}

export default UpdateCategory