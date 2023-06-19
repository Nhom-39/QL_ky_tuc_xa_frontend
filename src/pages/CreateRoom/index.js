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

    const [message, setMessage] = useState('');
    const [error, setError] = useState(false);
    const [errorValue1, setErrorValue1] = useState(false);
    const [errorValue2, setErrorValue2] = useState(false);
    const [errorValue3, setErrorValue3] = useState(false);

    const handleTenPhongChange = (event) => {
        setTenPhong(event.target.value);
    };

    const handleToaNhaChange = (event) => {
        setToaNha(event.target.value);
    };

    const handleSoLuongMaxChange = (event) => {
        setSoLuongMax(event.target.value);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const data = {
            tenPhong: tenPhong,
            toaNha: toaNha,
            soLuongMax: soLuongMax,
        };

        if (tenPhong.trim() && toaNha.trim() && soLuongMax.trim()) {
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
        } else {
            if (tenPhong.trim() === '') setErrorValue1(true);
            if (toaNha.trim() === '') setErrorValue2(true);
            if (soLuongMax.trim() === '') setErrorValue3(true);
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
                {errorValue1 && <p className={cx('error')}>*Tên phòng là bắt buộc</p>}
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
                {errorValue2 && <p className={cx('error')}>*Tên tòa nhà là bắt buộc</p>}
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
                {errorValue3 && <p className={cx('error')}>*Số lượng tối đa sinh viên là bắt buộc</p>}
                <input
                    id="so-luong"
                    className={errorValue3 ? cx('error-input') : cx('input')}
                    type="text"
                    value={soLuongMax}
                    onChange={handleSoLuongMaxChange}
                />
            </div>
            <Button success onClick={handleFormSubmit} to={config.routes.roomManager}>
                Thêm phòng
            </Button>
        </div>
    );
}

export default CreateRoom;
