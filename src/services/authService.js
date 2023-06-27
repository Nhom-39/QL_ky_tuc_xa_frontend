import * as httpRequest from '~/utils/httpRequest';
export const post = async (data) => {
    try {
        const res = await httpRequest.post(`/dang-ky`, data);
        console.log(res);
        return res;
    } catch (error) {
        console.log(error);
        if (error.response && error.response.status === 400) {
            return error.response.data;
        }
    }
};
export const postLogin = async (data) => {
    try {
        const res = await httpRequest.post(`/login`, data);
        console.log(res);
        localStorage.setItem('accessToken', res);
        localStorage.setItem('authenticated', res.authenticated);
        localStorage.setItem('authorities', res.authorities[0].authority);
        localStorage.setItem('credentials', res.credentials);
        localStorage.setItem('details', res.details);
        localStorage.setItem('name', res.name);
        localStorage.setItem('principal', res.principal);

        return true;
    } catch (error) {
        console.log(error);
        if (error.response && error.response.status === 500) {
            return error.response.data;
        }
        if (error.response && error.response.status === 401) {
            return error.response.data;
        }
    }
};

export const getLogout = async () => {
    try {
        const res = await httpRequest.get(`/dang-xuat`);
        console.log(res);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('authenticated');
        localStorage.removeItem('authorities');
        localStorage.removeItem('credentials');
        localStorage.removeItem('details');
        localStorage.removeItem('name');
        localStorage.removeItem('principal');
        return true;
    } catch (error) {
        console.log(error);
    }
};
