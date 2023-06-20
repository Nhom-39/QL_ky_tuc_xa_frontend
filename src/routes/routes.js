import config from '~/config';

import Home from '~/pages/Home';
import Profile from '~/pages/Profile';
import RoomManager from '~/pages/RoomManager';
import EditRoom from '~/pages/EditRoom';
import CreateRoom from '~/pages/CreateRoom';
import StudentManager from '~/pages/StudentManager';
import EditStudent from '~/pages/EditStudent';
import InfoRoom from '~/pages/InfoRoom';
import Register from '~/pages/Register';
import RoomList from '~/pages/RoomList';
import SearchPage from '~/pages/SearchPage';
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.profile, component: Profile },
    { path: config.routes.roomManager, component: RoomManager },
    { path: config.routes.createRoom, component: CreateRoom },
    { path: config.routes.studentManager, component: StudentManager },
    { path: config.routes.editStudent, component: EditStudent },
    { path: config.routes.infoRoom, component: InfoRoom },
    { path: config.routes.editRoom, component: EditRoom },
    { path: config.routes.register, component: Register },
    { path: config.routes.roomList, component: RoomList },
    { path: config.routes.search, component: SearchPage },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
