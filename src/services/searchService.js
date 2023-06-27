import * as httpRequest from '~/utils/httpRequest';

export const search = async (q) => {
    try {
        const res = await httpRequest.get('/tim-kiem/phong', {
            params: {
                q,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};
