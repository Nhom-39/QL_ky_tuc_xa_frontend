import axios from 'axios';

const httpRequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});

export const get = async (path) => {
    const response = await httpRequest.get(path);
    return response.data;
};

export const deleteReq = async (path) => {
    const response = await httpRequest.delete(path);
    return response.data;
};

export const post = async (path, options = {}) => {
    const response = await httpRequest.post(path, options);
    return response.data;
};

export default httpRequest;
