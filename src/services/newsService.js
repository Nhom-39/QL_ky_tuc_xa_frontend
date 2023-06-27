import * as httpRequest from '~/utils/httpRequest';

export const getNews = async () => {
    try {
        const res = await httpRequest.get('/thong-bao');
        console.log(res);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getNewsInfo = async (id) => {
    try {
        const res = await httpRequest.get(`/thong-bao/${id}`);
        console.log(res);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getTop3News = async (id) => {
    try {
        const res = await httpRequest.get(`/latest-news`);
        console.log(res);
        return res;
    } catch (error) {
        console.log(error);
    }
};
