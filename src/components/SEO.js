import React from "react";
import Head from "next/head";

const SEO = ({ title }) => {

    const description = process.env.siteDescription
    const keywords = process.env.siteKeywords
    const siteURL = process.env.siteUrl
    const imagePreview = `${siteURL}/icons8-cart-96.png`

    return (
        <Head>
            <meta charSet="utf-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />

            {/* Open Graph */}
            <meta property="og:url" content={siteURL} key="ogurl" />
            <meta property="og:image" content={imagePreview} key="ogimage" />
            <meta property="og:site_name" content={siteURL} key="ogsitename" />
            <meta property="og:title" content={title} key="ogtitle" />
            <meta property="og:description" content={description} key="ogdesc" />
            <title>{title}</title>

            <link
                href="/icons/icons8-cart-sapphire-16.png"
                rel="icon"
                type="image/png"
                sizes="16x16"
                purpose="any maskable"
            />
            <link
                href="/icons/icons8-cart-sapphire-32.png"
                rel="icon"
                type="image/png"
                sizes="32x32"
                purpose="any maskable"
            />
        </Head>
    )
}

export default SEO;