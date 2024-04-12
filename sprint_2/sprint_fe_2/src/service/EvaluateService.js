import req from "../http-common.js"
const handleEvaluate = (param) => {
    return req.post(`/evaluate/create-evaluate`, param);
}

const findAllEvaluate = (param) => {
    return req.get(`/evaluate/get-all-evaluate/${param}`)
}

export const EvaluateService = {
    handleEvaluate,
    findAllEvaluate
}