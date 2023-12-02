import React from 'react';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/globals.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { ToastContainer } from 'react-toastify';
import { configStore } from '@/redux/configureStore';
import { Provider } from 'react-redux';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_ENDPOINT_1;
axios.defaults.withCredentials = true;

const store = configStore();

function MyApp({ Component, pageProps }) {
    return (
        <Layout>
            <Provider store={store}>
                <SEO
                    title={process.env.siteTitle}
                />
                <ToastContainer />
                <Component {...pageProps} />
            </Provider>
        </Layout>
    );
}

export default MyApp;