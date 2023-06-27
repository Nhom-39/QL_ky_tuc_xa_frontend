import { useState } from 'react';
import classNames from 'classnames/bind';
import Button from '~/components/Button/Button';
import * as authService from '~/services/authService';
import styles from './Register.module.scss';
import images from '~/assets/images';
import { Col, Row } from 'react-bootstrap';
import config from '~/config';
import Toast from '~/components/Toast/Toast';

const cx = classNames.bind(styles);

function Register() {
    const [taiKhoan, setTaiKhoan] = useState('');
    const [matKhau, setMatKhau] = useState('');
    const [matKhauConfirm, setMatKhauConfirm] = useState('');
    const [hoTen, setHoTen] = useState('');
    const [email, setEmail] = useState('');
    const [gioiTinh, setGioiTinh] = useState('');
    const [ngaySinh, setNgaySinh] = useState('');
    const [soDienThoai, setSoDienThoai] = useState('');

    const [message, setMessage] = useState('');
    const [error, setError] = useState(false);

    const [errorValue1, setErrorValue1] = useState(false);
    const [errorValue2, setErrorValue2] = useState(false);
    const [errorValue3, setErrorValue3] = useState(false);
    const [errorValue4, setErrorValue4] = useState(false);
    const [errorValue5, setErrorValue5] = useState(false);
    const [errorValue6, setErrorValue6] = useState(false);
    const [errorValue7, setErrorValue7] = useState(false);
    const [errorValue8, setErrorValue8] = useState(false);
    const [errorValue9, setErrorValue9] = useState(false);

    const handleTaiKhoanChange = (event) => {
        setTaiKhoan(event.target.value.trim());
    };

    const handleMatKhauChange = (event) => {
        setMatKhau(event.target.value.trim());
    };
    const handleHoTenChange = (event) => {
        setHoTen(event.target.value);
    };
    const handleEmailChange = (event) => {
        setEmail(event.target.value.trim());
    };
    const handleGioiTinhChange = (event) => {
        setGioiTinh(event.target.value);
    };
    const handleNgaySinhChange = (event) => {
        setNgaySinh(event.target.value);
    };
    const handleSoDienThoaiChange = (event) => {
        setSoDienThoai(event.target.value);
    };

    const handleMatKhauConfirmChange = (event) => {
        setMatKhauConfirm(event.target.value.trim());
    };

    const handleFormSubmit = async (event) => {
        const data = {
            username: taiKhoan,
            password: matKhau,
            hoTen: hoTen,
            maSV: taiKhoan,
            email: email,
            ngaySinh: ngaySinh,
            gioiTinh: gioiTinh,
            soDienThoai: soDienThoai,
        };

        if (
            taiKhoan !== '' &&
            matKhau !== '' &&
            hoTen !== '' &&
            email !== '' &&
            ngaySinh !== '' &&
            gioiTinh !== '' &&
            soDienThoai !== '' &&
            matKhau === matKhauConfirm
        ) {
            try {
                const result = await authService.post(data);
                setMessage(result);
                if (result === 'Đăng ký tài khoản thành công') {
                    setError(false);
                } else setError(true);
                console.log(result);
            } catch (error) {
                console.error(error);
            }
        } else {
            if (taiKhoan === '') {
                setErrorValue1(true);
            } else setErrorValue1(false);
            if (hoTen === '') {
                setErrorValue2(true);
            } else setErrorValue2(false);
            if (email === '') {
                setErrorValue3(true);
            } else setErrorValue3(false);
            if (soDienThoai === '') {
                setErrorValue4(true);
            } else setErrorValue4(false);
            if (ngaySinh === '') {
                setErrorValue5(true);
            } else setErrorValue5(false);
            if (matKhau === '') {
                setErrorValue6(true);
            } else setErrorValue6(false);
            if (matKhauConfirm === '') {
                setErrorValue7(true);
            } else setErrorValue7(false);
            if (matKhau !== matKhauConfirm) {
                setErrorValue8(true);
            } else setErrorValue8(false);
            if (matKhau.length < 6) {
                setErrorValue9(true);
            } else setErrorValue9(false);
            setMessage('Các trường chưa được nhập đầy đủ hoặc sai thông tin');
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
                <Col lg={6} className={cx('register')}>
                    <div className={cx('padding-register')}>
                        <h2>Đăng ký</h2>
                        <p>Nếu bạn chưa có tài khoản, đăng ký tại đây</p>
                        <div className={cx('div-input', 'gird')}>
                            <label htmlFor="tai-khoan">Mã số sinh viên</label>
                            <input
                                id="tai-khoan"
                                placeholder="Mã số sinh viên"
                                className={errorValue1 ? cx('error-input') : cx('input')}
                                type="number"
                                value={taiKhoan}
                                onChange={handleTaiKhoanChange}
                            />
                        </div>

                        <div className={cx('div-input', 'gird')}>
                            <label htmlFor="ho-ten">Họ và Tên</label>
                            <input
                                id="ho-ten"
                                placeholder="Họ và tên"
                                className={errorValue2 ? cx('error-input') : cx('input')}
                                type="text"
                                value={hoTen}
                                onChange={handleHoTenChange}
                            />
                        </div>
                        <div className={cx('div-input', 'gird')}>
                            <label htmlFor="email">Email</label>

                            <input
                                id="email"
                                placeholder="Email"
                                className={errorValue3 ? cx('error-input') : cx('input')}
                                type="text"
                                value={email}
                                onChange={handleEmailChange}
                            />
                        </div>
                        <div className={cx('div-input', 'gird')}>
                            <label htmlFor="sdt">Số điện thoại</label>
                            <input
                                id="sdt"
                                placeholder="Số điện thoại"
                                className={errorValue4 ? cx('error-input') : cx('input')}
                                type="number"
                                value={soDienThoai}
                                onChange={handleSoDienThoaiChange}
                            />
                        </div>
                        <div className={cx('div-input', 'flex', 'div-flex-input')}>
                            <div>
                                <span>Giới tính</span>

                                <div>
                                    <label className={cx('margin')}>
                                        <input
                                            type="radio"
                                            value="Nam"
                                            checked={gioiTinh === 'Nam'}
                                            onChange={handleGioiTinhChange}
                                        />
                                        Nam
                                    </label>
                                    <label className={cx('margin')}>
                                        <input
                                            type="radio"
                                            value="Nữ"
                                            checked={gioiTinh === 'Nữ'}
                                            onChange={handleGioiTinhChange}
                                        />
                                        Nữ
                                    </label>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="ngay-sinh">Ngày sinh</label>

                                <input
                                    id="ngay-sinh"
                                    className={errorValue5 ? cx('error-input') : cx('input')}
                                    type="date"
                                    value={ngaySinh}
                                    onChange={handleNgaySinhChange}
                                />
                            </div>
                        </div>

                        <div className={cx('div-input', 'gird')}>
                            <label htmlFor="mat-khau">Mật khẩu</label>
                            {errorValue9 && <span className={cx('error')}>*Mật khẩu phải chứa ít nhất 6 ký tự</span>}
                            <input
                                id="mat-khau"
                                placeholder="Mật khẩu"
                                className={errorValue6 ? cx('error-input') : cx('input')}
                                type="password"
                                value={matKhau}
                                onChange={handleMatKhauChange}
                            />
                        </div>
                        <div className={cx('div-input', 'gird')}>
                            <label htmlFor="mat-khau2">Nhập lại mật khẩu</label>
                            {errorValue8 && <span className={cx('error')}>*Mật khẩu không khớp</span>}
                            <input
                                id="mat-khau2"
                                placeholder="Nhập lại mật khẩu"
                                className={errorValue7 ? cx('error-input') : cx('input')}
                                type="password"
                                value={matKhauConfirm}
                                onChange={handleMatKhauConfirmChange}
                            />
                        </div>
                        <Button success onClick={handleFormSubmit}>
                            Đăng ký
                        </Button>
                        <div className={cx('login')}>
                            Đã có tài khoản?{' '}
                            <Button text small to={config.routes.login}>
                                Đăng Nhập
                            </Button>
                        </div>
                    </div>
                </Col>
            </Row>
        </>
    );
}

export default Register;
