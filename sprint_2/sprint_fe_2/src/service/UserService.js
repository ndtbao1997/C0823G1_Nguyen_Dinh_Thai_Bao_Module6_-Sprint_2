import req from "../http-common.js"
const handleLogin = (param) => {
    return req.post(`/user/login`, param);
}
const handleLogout = () => {
    return req.get(`/user/logout`);
}

export const UserService = {
    handleLogin,
    handleLogout
}