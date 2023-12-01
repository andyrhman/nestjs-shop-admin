import axios from "axios";

const http = axios.create({
    baseURL: process.env.SERVER_ENDPOINT_2,
    withCredentials: true
});

export default http;