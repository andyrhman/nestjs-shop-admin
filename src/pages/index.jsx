import React from "react";

// Components
import Layout from "@/components/Layout";
import AdminWrapper from "@/components/AdminWrapper";

// Charts
import CardOrderChart from "@/components/Cards/CardOrderChart";
import CardUserChart from "@/components/Cards/CardUserChart";
import CardCartChart from "@/components/Cards/CardCartChart";

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
                    <div className="flex flex-wrap justify-center">
                        <div className="w-full xl:w-9/12 mb-12 xl:mb-0 px-4">
                            <CardOrderChart />
                        </div>
                        <div className="w-full xl:w-6/12 px-4">
                            <CardUserChart />
                        </div>
                        <div className="w-full xl:w-6/12 px-4">
                            <CardCartChart />
                        </div>
                    </div>
                    <FooterAdmin />
                </div>
            </AdminWrapper>
        </Layout>

    );
}
