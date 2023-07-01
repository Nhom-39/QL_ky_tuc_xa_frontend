import * as httpRequest from '~/utils/httpRequest';

export const getAllConsumptionDiaryByRoom = async (id_phong) => {
    try {
        const res = await httpRequest.get(`/user/theo-doi-phong/tai-chinh/${id_phong}`);
        console.log(res);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getAllConsumption = async () => {
    try {
        const res = await httpRequest.get(`/admin/quan-ly-tai-chinh`);
        console.log(res);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const removeConsumption = async (id) => {
    try {
        const res = await httpRequest.remove(`/admin/quan-ly-tai-chinh/${id}`);
        console.log(res);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const postCreateConsumption = async (roomId, data) => {
    try {
        const res = await httpRequest.post(`/admin/quan-ly-tai-chinh/create/${roomId}`, data);
        console.log(res);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const postCashCollection = async (id_tieu_thu, data) => {
    try {
        const res = await httpRequest.post(`/admin/quan-ly-tai-chinh/thu-tien/create/${id_tieu_thu}`, data);
        console.log(res);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getBill = async (id_tieu_thu) => {
    try {
        const res = await httpRequest.get(`/user/theo-doi-phong/tai-chinh/hoa-don/${id_tieu_thu}`);
        console.log(res);
        return res;
    } catch (error) {
        console.log(error);
    }
};
