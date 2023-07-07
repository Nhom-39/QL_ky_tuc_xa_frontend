import config from '~/config';

import Home from '~/pages/Home';
import Profile from '~/pages/Profile';
import RoomManager from '~/pages/RoomManager';
import EditRoom from '~/pages/EditRoom';
import CreateRoom from '~/pages/CreateRoom';
import StudentManager from '~/pages/StudentManager';
import EditStudent from '~/pages/EditStudent';
import Register from '~/pages/Register';
import RoomList from '~/pages/RoomList';
import SearchPage from '~/pages/SearchPage';
import Login from '~/pages/Login';
import NewsManager from '~/pages/NewsManager';
import CreateNews from '~/pages/CreateNews';
import EditNews from '~/pages/EditNews';
import NewsList from '~/pages/NewsList';
import NewsItem from '~/pages/NewsItem';
import RoomItem from '~/pages/RoomItem';
import RoomTracking from '~/pages/RoomTracking';
import FeedbackList from '~/pages/FeedbackList';
import FeedbackManager from '~/pages/FeedbackManager';
import FinancialManager from '~/pages/FinancialManager';
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.profile, component: Profile },
    { path: config.routes.login, component: Login },
    { path: config.routes.register, component: Register },
    { path: config.routes.roomItem, component: RoomItem },
    { path: config.routes.roomList, component: RoomList },
    { path: config.routes.search, component: SearchPage },
    { path: config.routes.newsList, component: NewsList },
    { path: config.routes.newsItem, component: NewsItem },
];

const privateRoutesAdmin = [
    { path: config.routes.roomManager, component: RoomManager },
    { path: config.routes.createRoom, component: CreateRoom },
    { path: config.routes.editRoom, component: EditRoom },
    { path: config.routes.studentManager, component: StudentManager },
    { path: config.routes.editStudent, component: EditStudent },
    { path: config.routes.newsManager, component: NewsManager },
    { path: config.routes.createNews, component: CreateNews },
    { path: config.routes.editNews, component: EditNews },
    { path: config.routes.feedbackManager, component: FeedbackManager },
    { path: config.routes.financialManager, component: FinancialManager },
];

const privateRoutesUser = [
    { path: config.routes.roomTracking, component: RoomTracking },
    { path: config.routes.feedbackList, component: FeedbackList },
];

export { publicRoutes, privateRoutesAdmin, privateRoutesUser };
