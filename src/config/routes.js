const routes = {
    home: '/',
    following: '/following',
    profile: '/:nickname',
    upload: '/upload',
    search: '/tim-kiem/phong',
    live: '/live',
    roomManager: '/admin/quan-ly-phong',
    editRoom: '/admin/quan-ly-phong/:id/edit',
    createRoom: '/admin/quan-ly-phong/create',
    studentManager: '/admin/quan-ly-sinh-vien',
    editStudent: '/admin/quan-ly-sinh-vien/:id/edit',
    infoRoom: '/admin/quan-ly-phong/:id',
    register: '/dang-ky',
    roomList: '/danh-sach-phong',
};

export default routes;
