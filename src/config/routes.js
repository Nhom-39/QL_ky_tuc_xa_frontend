const routes = {
    home: '/',
    search: '/tim-kiem/phong',
    roomManager: '/admin/quan-ly-phong',
    editRoom: '/admin/quan-ly-phong/:id/edit',
    createRoom: '/admin/quan-ly-phong/create',
    studentManager: '/admin/quan-ly-sinh-vien',
    editStudent: '/admin/quan-ly-sinh-vien/:id/edit',
    roomItem: '/danh-sach-phong/:id',
    register: '/dang-ky',
    roomList: '/danh-sach-phong',
    login: '/dang-nhap',
    newsManager: '/admin/quan-ly-thong-bao',
    createNews: '/admin/quan-ly-thong-bao/create',
    editNews: '/admin/quan-ly-thong-bao/:id/edit',
    newsList: '/thong-bao',
    newsItem: '/thong-bao/:id',
    roomTracking: '/user/theo-doi-phong',
    feedbackList: '/user/bao-cao-va-phan-hoi',
    feedbackManager: '/admin/phan-hoi-y-kien',
    financialManager: '/admin/quan-ly-tai-chinh',
};

export default routes;
