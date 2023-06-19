import config from '~/config';

import Home from '~/pages/Home';
import Profile from '~/pages/Profile';
import Search from '~/pages/Search';
import Notification from '~/pages/Notification';
import Feedback from '~/pages/feedback';

const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.profile, component: Profile },
    { path: config.routes.search, component: Search },
    { path: config.routes.notification, component: Notification },
    { path: config.routes.feedback, component: Feedback },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
