import { useState } from 'react';
import classNames from 'classnames/bind';
import Button from '~/components/Button';
import config from '~/config';
import * as roomManagerService from '~/services/roomManagerService';
import Toast from '~/components/Toast/Toast';

import styles from './CreateRoom.module.scss';

const cx = classNames.bind(styles);

function CreateRoom() {
    const [tenPhong, setTenPhong] = useState('');
    const [toaNha, setToaNha] = useState('');
    const [soLuongMax, setSoLuongMax] = useState('');
    const [giaPhong, setGiaPhong] = useState('');
    const [thongTin, setThongTin] = useState('');
    const [image, setImage] = useState('');

    const [message, setMessage] = useState('');
    const [error, setError] = useState(false);
    const [errorValue1, setErrorValue1] = useState(false);
    const [errorValue2, setErrorValue2] = useState(false);
    const [errorValue3, setErrorValue3] = useState(false);
    const [errorValue4, setErrorValue4] = useState(false);
    const [errorValue5, setErrorValue5] = useState(false);
    const [errorValue6, setErrorValue6] = useState(false);

    const handleTenPhongChange = (event) => {
        setTenPhong(event.target.value);
    };

    const handleToaNhaChange = (event) => {
        setToaNha(event.target.value);
    };

    const handleSoLuongMaxChange = (event) => {
        setSoLuongMax(event.target.value);
    };
    const handleGiaPhongChange = (event) => {
        setGiaPhong(event.target.value);
    };

    const handleThongTinChange = (event) => {
        setThongTin(event.target.value);
    };

    const handleImageChange = (event) => {
        setImage(event.target.value);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const data = {
            tenPhong: tenPhong,
            toaNha: toaNha,
            soLuongMax: soLuongMax,
            giaPhong: giaPhong,
            thongTin: thongTin,
            image: image,
        };

        if (
            tenPhong !== '' &&
            toaNha !== '' &&
            soLuongMax !== '' &&
            giaPhong !== '' &&
            thongTin !== '' &&
            image !== ''
        ) {
            try {
                await roomManagerService.post(data);
            } catch (error) {
                console.error(error);
            }
            setMessage('Thêm phòng thành công');
            setError(false);
            setTenPhong('');
            setToaNha('');
            setSoLuongMax('');
            setGiaPhong('');
            setThongTin('');
            setImage('');
        } else {
            if (tenPhong === '') setErrorValue1(true);
            if (toaNha === '') setErrorValue2(true);
            if (soLuongMax === '') setErrorValue3(true);
            if (giaPhong === '') setErrorValue4(true);
            if (thongTin === '') setErrorValue5(true);
            if (image === '') setErrorValue6(true);
            setMessage('Các trường chưa nhập đầy đủ thông tin');
            setError(true);
        }

        setTimeout(() => {
            setMessage('');
        }, 3000);
    };

    return (
        <div className={cx('wrapper')}>
            {!!message && !error && <Toast message={message} success />}
            {!!message && error && <Toast message={message} error />}
            <div className={cx('div-input', 'gird')}>
                <label htmlFor="ten-phong">Tên phòng</label>
                {errorValue1 && <span className={cx('error')}>*Tên phòng là bắt buộc</span>}
                <input
                    id="ten-phong"
                    className={errorValue1 ? cx('error-input') : cx('input')}
                    type="text"
                    value={tenPhong}
                    onChange={handleTenPhongChange}
                />
            </div>
            <div className={cx('div-input', 'gird')}>
                <label htmlFor="toa-nha">Tên tòa nhà</label>
                {errorValue2 && <span className={cx('error')}>*Tên tòa nhà là bắt buộc</span>}
                <input
                    id="toa-nha"
                    className={errorValue2 ? cx('error-input') : cx('input')}
                    type="text"
                    value={toaNha}
                    onChange={handleToaNhaChange}
                />
            </div>
            <div className={cx('div-input', 'gird')}>
                <label htmlFor="so-luong">Số lượng tối đa sinh viên</label>
                {errorValue3 && (
                    <span className={cx('error')}>*Số lượng tối đa sinh viên là bắt buộc và phải là 1 số</span>
                )}
                <input
                    id="so-luong"
                    className={errorValue3 ? cx('error-input') : cx('input')}
                    type="number"
                    value={soLuongMax}
                    onChange={handleSoLuongMaxChange}
                />
            </div>
            <div className={cx('div-input', 'gird')}>
                <label htmlFor="gia-phong">Giá phòng</label>
                {errorValue4 && <span className={cx('error')}>*Giá phòng là bắt buộc</span>}
                <input
                    id="gia-phong"
                    className={errorValue4 ? cx('error-input') : cx('input')}
                    type="number"
                    value={giaPhong}
                    onChange={handleGiaPhongChange}
                />
            </div>
            <div className={cx('div-input', 'gird')}>
                <label htmlFor="thong-tin">Thông tin phòng</label>
                {errorValue5 && <span className={cx('error')}>*Thông tin phòng là bắt buộc</span>}
                <input
                    id="thong-tin"
                    className={errorValue5 ? cx('error-input') : cx('input')}
                    type="text"
                    value={thongTin}
                    onChange={handleThongTinChange}
                />
            </div>
            <div className={cx('div-input', 'gird')}>
                <label htmlFor="image">Ảnh</label>
                {errorValue6 && <span className={cx('error')}>*Ảnh là bắt buộc</span>}
                <input
                    id="image"
                    className={errorValue6 ? cx('error-input') : cx('input')}
                    type="text"
                    value={image}
                    onChange={handleImageChange}
                />
            </div>
            <Button success onClick={handleFormSubmit} to={config.routes.roomManager}>
                Thêm phòng
            </Button>
        </div>
    );
}

export default CreateRoom;
