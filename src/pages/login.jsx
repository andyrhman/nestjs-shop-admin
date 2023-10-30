import React from 'react'
import Layout from '@/components/Layout'
import AuthLogin from '@/components/Auth/Login'
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

const Login = () => {
    const pageTitle = `Login | ${process.env.siteTitle}`
  return (
    <Layout>
        <SEO title={pageTitle}/>
        <AuthLogin/>
        <Footer/>
    </Layout>
  )
}

export default Login