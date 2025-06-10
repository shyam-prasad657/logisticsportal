import axios from 'axios';

const axiosInstance = axios.create({
    baseURL : 'http://localhost:8081',
    withCredentials : true
});

axiosInstance.interceptors.request.use(config => {
    const token = 12345;
    if(token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

export default axiosInstance;