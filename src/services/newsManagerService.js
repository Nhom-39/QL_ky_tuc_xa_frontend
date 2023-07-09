import * as httpRequest from '~/utils/httpRequest';

export const getNews = async () => {
    try {
        const res = await httpRequest.get('/admin/quan-ly-thong-bao');
        console.log(res);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const remove = async (id) => {
    try {
        const res = await httpRequest.remove(`/admin/quan-ly-thong-bao/${id}`);
        console.log(res);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const edit = async (id) => {
    try {
        const res = await httpRequest.get(`/admin/quan-ly-thong-bao/${id}/edit`);
        console.log(res);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getNewsInfo = async (id) => {
    try {
        const res = await httpRequest.get(`/admin/quan-ly-thong-bao/${id}`);
        console.log(res);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const put = async (id, data) => {
    try {
        const res = await httpRequest.put(`/admin/quan-ly-thong-bao/${id}`, data);
        console.log(res);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const post = async (username, data) => {
    try {
        const res = await httpRequest.post(`/admin/quan-ly-thong-bao/create/${username}`, data);
        console.log(res);
        return res;
    } catch (error) {
        console.log(error);
    }
};
