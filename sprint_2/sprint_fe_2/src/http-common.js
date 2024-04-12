import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/api",
    withCredentials: true
});

axiosInstance.interceptors.request.use(
    config => {
        const jwtToken = getJwtTokenFromCookie(); // Lấy token từ cookie
        if (jwtToken) {
            config.headers['Authorization'] = `Bearer ${jwtToken}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

function getJwtTokenFromCookie() {
    const jwt = Cookies.get("jwtToken");
    if (jwt !== undefined){
        return jwt;
    } else {
        return "";
    }
}

export default axiosInstance;