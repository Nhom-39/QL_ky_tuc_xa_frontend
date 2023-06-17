import * as httpRequest from '~/utils/httpRequest';

export const getStudents = async () => {
    try {
        const res = await httpRequest.get('admin/quan-ly-sinh-vien');
        console.log(res);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const remove = async (id) => {
    try {
        const res = await httpRequest.remove(`admin/quan-ly-sinh-vien/${id}`);
        console.log(res);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const edit = async (id) => {
    try {
        const res = await httpRequest.get(`admin/quan-ly-sinh-vien/${id}/edit`);
        console.log(res);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const put = async (id, data) => {
    try {
        const res = await httpRequest.put(`admin/quan-ly-sinh-vien/${id}`, data);
        console.log(res);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const addStudentToRoom = async (id, id_phong) => {
    try {
        const res = await httpRequest.put(`admin/quan-ly-sinh-vien/${id}/them-vao-phong`, '', {
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

export const getCreate = async () => {
    try {
        const res = await httpRequest.get(`admin/quan-ly-sinh-vien/create`);
        console.log(res);
        return res;
    } catch (error) {
        console.log(error);
    }
};
