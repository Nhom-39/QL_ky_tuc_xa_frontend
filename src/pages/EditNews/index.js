import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import Button from '~/components/Button/Button';
import Toast from '~/components/Toast/Toast';
import * as newsManagerService from '~/services/newsManagerService';

import styles from './EditNews.module.scss';

const cx = classNames.bind(styles);

function EditNews() {
    const { id } = useParams();

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
            id: id,
            tieuDe: tieuDe,
            noiDung: noiDung,
            image: image,
        };

        if (tieuDe !== '' && noiDung !== '' && image !== '') {
            try {
                await newsManagerService.put(id, data);
            } catch (error) {
                console.error(error);
            }
            setMessage('Lưu thông báo thành công');
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

    useEffect(() => {
        const fetchApi = async () => {
            const result = await newsManagerService.edit(id);
            setTieuDe(result.tieuDe);
            setNoiDung(result.noiDung);
            setImage(result.image);
        };

        fetchApi();
    }, [id]);

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
                Lưu
            </Button>
        </div>
    );
}

export default EditNews;
