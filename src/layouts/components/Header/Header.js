import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBullhorn,
    faCoins,
    faEarthAsia,
    faEllipsisVertical,
    faPeopleRoof,
    faSignOut,
    faSms,
    faUserGear,
} from '@fortawesome/free-solid-svg-icons';

import { Link } from 'react-router-dom';
import 'tippy.js/dist/tippy.css';

import logoWeb from '~/assets/images/cropped-logo_ktx.png';
import config from '~/config';
import Button from '~/components/Button';
import styles from './Header.module.scss';
import Menu from '~/components/Popper/Menu';
import Image from '~/components/Image';
import Search from '../Search';
import Navigation from '../Navigation';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faEarthAsia}></FontAwesomeIcon>,
        title: 'Tiếng việt',
        children: {
            title: 'Language',
            data: [
                {
                    type: 'Language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'Language',
                    code: 'vi',
                    title: 'Tiếng việt',
                },
            ],
        },
    },
];

function Header() {
    const authenticated = localStorage.getItem('authenticated');
    const authority = localStorage.getItem('authorities');
    const adminMenu = [
        {
            icon: <FontAwesomeIcon icon={faPeopleRoof}></FontAwesomeIcon>,
            title: 'Quản lý phòng',
            to: '/admin/quan-ly-phong',
        },
        {
            icon: <FontAwesomeIcon icon={faUserGear}></FontAwesomeIcon>,
            title: 'Quản lý sinh viên',
            to: '/admin/quan-ly-sinh-vien',
        },
        {
            icon: <FontAwesomeIcon icon={faCoins}></FontAwesomeIcon>,
            title: 'Quản lý tài chính',
            to: '/admin/quan-ly-tai-chinh',
        },
        {
            icon: <FontAwesomeIcon icon={faBullhorn}></FontAwesomeIcon>,
            title: 'Quản lý thông báo',
            to: '/admin/quan-ly-thong-bao',
        },
        {
            icon: <FontAwesomeIcon icon={faSms}></FontAwesomeIcon>,
            title: 'Phản hồi ý kiến sinh viên',
            to: '/admin/phan-hoi-y-kien',
        },
        ...MENU_ITEMS,
        {
            icon: <FontAwesomeIcon icon={faSignOut}></FontAwesomeIcon>,
            title: 'Đăng xuất',
            to: '/',
            separate: true,
        },
    ];

    const userMenu = [
        {
            icon: <FontAwesomeIcon icon={faPeopleRoof}></FontAwesomeIcon>,
            title: 'Theo dõi phòng',
            to: '/user/theo-doi-phong',
        },
        {
            icon: <FontAwesomeIcon icon={faSms}></FontAwesomeIcon>,
            title: 'Báo cáo và phản hồi',
            to: '/user/bao-cao-va-phan-hoi',
        },
        ...MENU_ITEMS,
        {
            icon: <FontAwesomeIcon icon={faSignOut}></FontAwesomeIcon>,
            title: 'Đăng xuất',
            to: '/',
            separate: true,
        },
    ];

    const itemsAdmin = authority === 'ADMIN' ? adminMenu : MENU_ITEMS;
    const itemsUser = authority === 'USER' ? userMenu : MENU_ITEMS;
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link to={config.routes.home} className={cx('logo-link')}>
                    <img src={logoWeb} alt="" />
                </Link>

                <Navigation />

                <Search />

                <div className={cx('actions')}>
                    {authenticated ? (
                        <></>
                    ) : (
                        <>
                            <Button primary className={cx('custom-login')} to={config.routes.login}>
                                Đăng nhập
                            </Button>
                            <Button primary className={cx('custom-login')} to={config.routes.register}>
                                Đăng ký
                            </Button>
                        </>
                    )}
                    {/* <Menu items={authenticated ? adminMenu : MENU_ITEMS} onChange={handleMenuChange}>
                        {authenticated ? (
                            <Image
                                className={cx('user-avatar')}
                                src="https://tse2.mm.bing.net/th?id=OIP.KGdLPsiqGjKqCYuhzhmmWgHaEP&pid=Api&P=0&h=180"
                                alt=""
                            />
                        ) : (
                            <button className={cx('more-btn')}>
                                <FontAwesomeIcon icon={faEllipsisVertical}></FontAwesomeIcon>
                            </button>
                        )}
                    </Menu> */}
                    <Menu
                        items={
                            (authority === 'ADMIN' && itemsAdmin) || (authority === 'USER' && itemsUser) || MENU_ITEMS
                        }
                    >
                        {authenticated ? (
                            <Image
                                className={cx('user-avatar')}
                                src="https://tse2.mm.bing.net/th?id=OIP.KGdLPsiqGjKqCYuhzhmmWgHaEP&pid=Api&P=0&h=180"
                                alt=""
                            />
                        ) : (
                            <button className={cx('more-btn')}>
                                <FontAwesomeIcon icon={faEllipsisVertical}></FontAwesomeIcon>
                            </button>
                        )}
                    </Menu>
                </div>
            </div>
        </header>
    );
}

export default Header;
