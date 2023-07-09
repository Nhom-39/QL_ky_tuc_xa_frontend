import * as httpRequest from '~/utils/httpRequest';

export const getFeedbackByUser = async (masv) => {
    try {
        const res = await httpRequest.get(`/user/bao-cao-va-phan-hoi/${masv}`);
        console.log(res);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getFeedbackAll = async () => {
    try {
        const res = await httpRequest.get(`/admin/phan-hoi-y-kien`);
        console.log(res);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const remove = async (id) => {
    try {
        const res = await httpRequest.remove(`/admin/bao-cao-va-phan-hoi/${id}`);
        console.log(res);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const put = async (id, username, data) => {
    try {
        const res = await httpRequest.put(`/admin/phan-hoi-y-kien/${id}/${username}`, data);
        console.log(res);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const postCreateReport = async (masv, data) => {
    try {
        const res = await httpRequest.post(`/user/${masv}/bao-cao-va-phan-hoi/create`, data);
        console.log(res);
        return res;
    } catch (error) {
        console.log(error);
    }
};
