import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import { useParams } from 'react-router-dom';
import Button from '~/components/Button/Button';
import Toast from '~/components/Toast/Toast';
import * as studentManagerService from '~/services/studentManagerService';
import styles from './EditStudent.module.scss';

const cx = classNames.bind(styles);

function EditStudent() {
    const { id } = useParams();

    const [hoTen, setHoTen] = useState('');
    const [email, setEmail] = useState('');
    const [gioiTinh, setGioiTinh] = useState('');
    const [maSV, setMaSV] = useState('');
    const [ngaySinh, setNgaySinh] = useState('');
    const [soDienThoai, setSoDienThoai] = useState('');

    const [message, setMessage] = useState('');
    const [error, setError] = useState(false);
    const [errorValue1, setErrorValue1] = useState(false);
    const [errorValue2, setErrorValue2] = useState(false);
    const [errorValue4, setErrorValue4] = useState(false);
    const [errorValue5, setErrorValue5] = useState(false);
    const [errorValue6, setErrorValue6] = useState(false);

    const handleHoTenChange = (event) => {
        setHoTen(event.target.value);
    };
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleOptionGioiTinhChange = (event) => {
        setGioiTinh(event.target.value);
    };

    const handleMaSVChange = (event) => {
        setMaSV(event.target.value);
    };

    const handleNgaySinhChange = (event) => {
        setNgaySinh(event.target.value);
    };
    const handleSoDienThoaiChange = (event) => {
        setSoDienThoai(event.target.value);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const data = {
            id: id,
            hoTen: hoTen,
            email: email,
            gioiTinh: gioiTinh,
            maSV: maSV,
            ngaySinh: ngaySinh,
            soDienThoai: soDienThoai,
        };
        if (hoTen !== '' && email !== '' && maSV !== '' && ngaySinh !== '' && soDienThoai !== '') {
            try {
                await studentManagerService.put(id, data);
            } catch (error) {
                console.error(error);
            }
            setMessage('Lưu thông tin sinh viên thành công');
        } else {
            if (hoTen === '') setErrorValue1(true);
            if (email === '') setErrorValue2(true);
            if (maSV === '') setErrorValue4(true);
            if (ngaySinh === '') setErrorValue5(true);
            if (soDienThoai === '') setErrorValue6(true);
            setMessage('Các trường chưa được nhập đầy đủ thông tin');
            setError(true);
        }
        setTimeout(() => {
            setMessage('');
        }, 3000);
    };

    useEffect(() => {
        const fetchApi = async () => {
            const result = await studentManagerService.edit(id);
            setHoTen(result.hoTen);
            setEmail(result.email);
            setGioiTinh(result.gioiTinh);
            setMaSV(result.maSV);
            setNgaySinh(result.ngaySinh);
            setSoDienThoai(result.soDienThoai);
        };

        fetchApi();
    }, [id]);

    return (
        <div>
            <div className={cx('wrapper')}>
                {!!message && !error && <Toast message={message} success />}
                {!!message && error && <Toast message={message} error />}
                <div className={cx('div-input', 'gird')}>
                    <label htmlFor="ho-ten">Họ và tên</label>
                    {errorValue1 && <span className={cx('error')}>*Họ và tên là bắt buộc</span>}
                    <input
                        id="ho-ten"
                        className={errorValue1 ? cx('error-input') : cx('input')}
                        type="text"
                        value={hoTen}
                        onChange={handleHoTenChange}
                    />
                </div>
                <div className={cx('div-input', 'gird')}>
                    <label htmlFor="ma-sv">Mã số sinh viên</label>
                    {errorValue2 && <span className={cx('error')}>*Mã số sinh viên là bắt buộc và phải là 1 số</span>}
                    <input
                        id="ma-sv"
                        className={errorValue2 ? cx('error-input') : cx('input')}
                        type="number"
                        value={maSV}
                        onChange={handleMaSVChange}
                    />
                </div>

                <div className={cx('div-input', 'flex', 'div-flex-input')}>
                    <div>
                        <span>Giới tính</span>
                        <label className={cx('margin')}>
                            <input
                                type="radio"
                                value="Nam"
                                checked={gioiTinh === 'Nam'}
                                onChange={handleOptionGioiTinhChange}
                            />
                            Nam
                        </label>
                        <label className={cx('margin')}>
                            <input
                                type="radio"
                                value="Nữ"
                                checked={gioiTinh === 'Nữ'}
                                onChange={handleOptionGioiTinhChange}
                            />
                            Nữ
                        </label>
                    </div>
                    <div>
                        <label htmlFor="ngay-sinh">Chọn ngày sinh</label>
                        {errorValue4 && <span className={cx('error')}>*Ngày sinh là bắt buộc</span>}
                        <input
                            id="ngay-sinh"
                            className={errorValue4 ? cx('error-input') : cx('input')}
                            type="date"
                            value={ngaySinh}
                            onChange={handleNgaySinhChange}
                        />
                    </div>
                </div>

                <div className={cx('div-input', 'gird')}>
                    <label htmlFor="email">Email</label>
                    {errorValue5 && <span className={cx('error')}>*Email là bắt buộc</span>}
                    <input
                        id="email"
                        className={errorValue5 ? cx('error-input') : cx('input')}
                        type="text"
                        value={email}
                        onChange={handleEmailChange}
                    />
                </div>
                <div className={cx('div-input', 'gird')}>
                    <label htmlFor="sdt">Số điện thoại</label>
                    {errorValue6 && <span className={cx('error')}>*Số điện thoại là bắt buộc và phải là 1 số</span>}
                    <input
                        id="sdt"
                        className={errorValue6 ? cx('error-input') : cx('input')}
                        type="number"
                        value={soDienThoai}
                        onChange={handleSoDienThoaiChange}
                    />
                </div>
                <Button success onClick={handleFormSubmit}>
                    Lưu
                </Button>
            </div>
        </div>
    );
}

export default EditStudent;
