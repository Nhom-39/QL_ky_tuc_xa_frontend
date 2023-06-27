import Button from '~/components/Button/Button';
import { useState } from 'react';
import * as authService from '~/services/authService';
import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import images from '~/assets/images';
import { Col, Row } from 'react-bootstrap';
import config from '~/config';
import Toast from '~/components/Toast/Toast';

const cx = classNames.bind(styles);
function Login() {
    const [taiKhoan, setTaiKhoan] = useState('');
    const [matKhau, setMatKhau] = useState('');

    const [message, setMessage] = useState('');
    const [error, setError] = useState(false);

    const handleTaiKhoanChange = (event) => {
        setTaiKhoan(event.target.value.trim());
    };

    const handleMatKhauChange = (event) => {
        setMatKhau(event.target.value.trim());
    };

    const handleFormSubmit = async (event) => {
        const data = {
            username: taiKhoan,
            password: matKhau,
        };

        if (taiKhoan !== '' && matKhau !== '') {
            try {
                const result = await authService.postLogin(data);
                if (result === true) {
                    setMessage('Đăng nhập thành công');
                    setError(false);
                } else {
                    setMessage(result);
                    setError(true);
                }
            } catch (error) {
                console.error(error);
            }
        } else {
            setMessage('Tài khoản hoặc mật khẩu không chính xác');
            setError(true);
        }
        setTimeout(() => {
            setMessage('');
        }, 3000);
    };
    return (
        <>
            {!!message && !error && <Toast message={message} success />}
            {!!message && error && <Toast message={message} error />}
            <Row className={cx('wrapper', 'flex')}>
                <Col lg={6}>
                    <img className={cx('banner')} src={images.banner} alt="" />
                </Col>
                <Col lg={6} className={cx('login')}>
                    <div className={cx('padding-login')}>
                        <h2>Đăng nhập</h2>
                        <p>Nếu bạn đã có tài khoản, đăng nhập tại đây</p>
                        <div className={cx('div-input', 'gird')}>
                            <label htmlFor="tai-khoan">Tài khoản</label>
                            <input
                                id="tai-khoan"
                                placeholder="Mã số sinh viên"
                                className={error ? cx('error-input') : cx('input')}
                                type="text"
                                value={taiKhoan}
                                onChange={handleTaiKhoanChange}
                            />
                        </div>
                        <div className={cx('div-input', 'gird')}>
                            <label htmlFor="mat-khau">Mật khẩu</label>
                            <input
                                id="mat-khau"
                                placeholder="Mật khẩu"
                                className={error ? cx('error-input') : cx('input')}
                                type="password"
                                value={matKhau}
                                onChange={handleMatKhauChange}
                            />
                        </div>
                        <Button success onClick={handleFormSubmit}>
                            Đăng nhập
                        </Button>
                        <div className={cx('register')}>
                            Không có tài khoản?{' '}
                            <Button text small to={config.routes.register}>
                                Đăng ký
                            </Button>
                        </div>
                    </div>
                </Col>
            </Row>
        </>
    );
}

export default Login;
