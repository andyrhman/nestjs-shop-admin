import axios from "axios";

const http = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_ENDPOINT_2,
    withCredentials: true
});

export default http;