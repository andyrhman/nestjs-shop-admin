import React from "react";

// Components
import Layout from "@/components/Layout";
import AdminWrapper from "@/components/AdminWrapper";
import CardLineChart from "@/components/Cards/CardLineChart";
import HeaderStats from "@/components/HeaderStats.js";
import FooterAdmin from "@/components/AdminFooter.js";
import SEO from "@/components/SEO";

export default function index() {
    const pageTitle = `Dashboard | ${process.env.siteTitle}`
    return (
        <Layout>
            <SEO title={pageTitle}/>
            <AdminWrapper>
                {/* Header */}
                <HeaderStats />
                <div className="px-4 md:px-10 mx-auto w-full -m-24">
                    <div className="flex flex-wrap">
                        <div className="w-full mb-12 xl:mb-0 px-4">
                            <CardLineChart />
                        </div>
                    </div>
                    <FooterAdmin />
                </div>
            </AdminWrapper>
        </Layout>

    );
}
