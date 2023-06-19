import classNames from 'classnames/bind';
import styles from './Navigation.module.scss';
import Menu, { MenuItem } from './Menu';
import config from '~/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faHome } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Navigation() {
    return (
        <aside className={cx('wrapper')}>
            <Menu>
                <MenuItem title="Trang chủ" to={config.routes.home} icon={<FontAwesomeIcon icon={faHome} />} />
                <MenuItem title="QL thông báo" to={config.routes.notification} icon={<FontAwesomeIcon icon={faBell} />} />
            </Menu>
        </aside>
    );
}

export default Navigation;
