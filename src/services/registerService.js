import * as httpRequest from '~/utils/httpRequest';
export const post = async (data) => {
    try {
        const res = await httpRequest.post(`dang-ky`, data);
        console.log(res);
        return res;
    } catch (error) {
        console.log(error);
    }
};
