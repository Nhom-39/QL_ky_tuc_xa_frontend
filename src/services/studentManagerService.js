import * as httpRequest from '~/utils/httpRequest';

export const getStudents = async () => {
    try {
        const res = await httpRequest.get('/admin/quan-ly-sinh-vien');
        console.log(res);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const remove = async (id) => {
    try {
        const res = await httpRequest.remove(`/admin/quan-ly-sinh-vien/${id}`);
        console.log(res);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const edit = async (id) => {
    try {
        const res = await httpRequest.get(`/admin/quan-ly-sinh-vien/${id}/edit`);
        console.log(res);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const put = async (id, data) => {
    try {
        const res = await httpRequest.put(`/admin/quan-ly-sinh-vien/${id}`, data);
        console.log(res);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const addStudentToRoom = async (id, id_phong) => {
    try {
        const res = await httpRequest.put(`/admin/quan-ly-sinh-vien/${id}/them-vao-phong`, '', {
            params: {
                id_phong,
            },
        });
        console.log(res);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const RemoveStudentToRoom = async (id) => {
    try {
        const res = await httpRequest.put(`/admin/quan-ly-sinh-vien/${id}/xoa-khoi-phong`);
        console.log(res);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const registerRoom = async (masv, id_phong_dang_ky) => {
    try {
        const res = await httpRequest.put(`/user/${masv}/dang-ky-phong`, '', {
            params: {
                id_phong_dang_ky,
            },
        });
        console.log(res);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getInfoRoom = async (masv) => {
    try {
        const res = await httpRequest.get(`user/${masv}/room`);
        console.log(res);
        return res;
    } catch (error) {
        console.log(error);
    }
};
