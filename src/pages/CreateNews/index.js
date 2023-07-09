import { useState } from 'react';
import classNames from 'classnames/bind';
import Button from '~/components/Button';
import * as newsManagerService from '~/services/newsManagerService';
import Toast from '~/components/Toast/Toast';

import styles from './CreateNews.module.scss';

const cx = classNames.bind(styles);

function CreateNews() {
    const [tieuDe, setTieuDe] = useState('');
    const [noiDung, setNoiDung] = useState('');
    const [image, setImage] = useState('');

    const [message, setMessage] = useState('');
    const [error, setError] = useState(false);
    const [errorValue1, setErrorValue1] = useState(false);
    const [errorValue2, setErrorValue2] = useState(false);
    const [errorValue3, setErrorValue3] = useState(false);

    const handleTieuDeChange = (event) => {
        setTieuDe(event.target.value);
    };

    const handleNoiDungChange = (event) => {
        setNoiDung(event.target.value);
    };

    const handleImageChange = (event) => {
        setImage(event.target.value);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const data = {
            tieuDe: tieuDe,
            noiDung: noiDung,
            image: image,
        };

        if (tieuDe !== '' && noiDung !== '' && image !== '') {
            try {
                await newsManagerService.post(localStorage.getItem('name'), data);
            } catch (error) {
                console.error(error);
            }
            setMessage('Thêm thông báo thành công');
            setError(false);
            setTieuDe('');
            setNoiDung('');
            setImage('');
        } else {
            if (tieuDe === '') setErrorValue1(true);
            if (noiDung === '') setErrorValue2(true);
            if (image === '') setErrorValue3(true);
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
                <label htmlFor="tieu-de">Tiêu đề</label>
                {errorValue1 && <span className={cx('error')}>*Tiêu đề là bắt buộc</span>}
                <input
                    id="tieu-de"
                    className={errorValue1 ? cx('error-input') : cx('input')}
                    type="text"
                    value={tieuDe}
                    onChange={handleTieuDeChange}
                />
            </div>
            <div className={cx('div-input', 'gird')}>
                <label htmlFor="noi-dung">Nội dung</label>
                {errorValue2 && <span className={cx('error')}>*Nội dung là bắt buộc</span>}
                <textarea
                    rows={10}
                    id="noi-dung"
                    className={errorValue2 ? cx('error-input') : cx('input')}
                    type="text"
                    value={noiDung}
                    onChange={handleNoiDungChange}
                />
            </div>
            <div className={cx('div-input', 'gird')}>
                <label htmlFor="image">Ảnh</label>
                {errorValue3 && <span className={cx('error')}>*Ảnh là bắt buộc</span>}
                <input
                    id="image"
                    className={errorValue3 ? cx('error-input') : cx('input')}
                    type="text"
                    value={image}
                    onChange={handleImageChange}
                />
            </div>

            <Button success onClick={handleFormSubmit}>
                Thêm thông báo
            </Button>
        </div>
    );
}

export default CreateNews;
