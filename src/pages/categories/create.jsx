import React from "react";
import Layout from "@/components/Layout";
import AdminWrapper from "@/components/AdminWrapper";
import CreateCategoryForm from "@/components/Forms/CreateCategoryForm";
import SEO from "@/components/SEO";

const CreateCategory = () => {
    const pageTitle = `Create Product | ${process.env.siteTitle}`
    return (
        <Layout>
            <SEO title={pageTitle} />
            <AdminWrapper>
                <div className="relative md:pt-24 pb-24 pt-12">
                    <div className="px-4 md:px-10 mx-auto w-full">
                        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded light bg-white" >
                            <div className="rounded-t mb-0 px-4 py-3 border-0">
                                <div className="mb-8 flex items-center justify-between">
                                    <div>
                                        <article className="prose">
                                            <h3>Create Category</h3>
                                        </article>
                                    </div>
                                </div>
                            </div>
                            <div className="block w-full overflow-x-auto">
                                <CreateCategoryForm />
                            </div>
                        </div>
                    </div>
                </div>
            </AdminWrapper>
        </Layout>
    )
}

export default CreateCategory;