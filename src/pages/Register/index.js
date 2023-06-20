import Button from '~/components/Button/Button';
import { useState } from 'react';
import * as registerService from '~/services/registerService';

function Register() {
    const [taiKhoan, setTaiKhoan] = useState('mvt161001');
    const [matKhau, setMatKhau] = useState('20194184');

    const handleTaiKhoanChange = (event) => {
        setTaiKhoan(event.target.value);
    };

    const handleMatKhauChange = (event) => {
        setMatKhau(event.target.value);
    };

    const handleFormSubmit = async (event) => {
        const data = {
            taiKhoan: taiKhoan,
            matKhau: matKhau,
        };
        try {
            await registerService.post(data);
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div>
            {/* {!!message && !error && <Toast message={message} success />}
            {!!message && error && <Toast message={message} error />} */}
            <div>
                <label htmlFor="ten-phong">Tên phòng</label>
                {/* {errorValue1 && <span className={cx('error')}>*Tên phòng là bắt buộc</span>} */}
                <input
                    id="ten-phong"
                    // className={errorValue1 ? cx('error-input') : cx('input')}
                    type="text"
                    value={taiKhoan}
                    onChange={handleTaiKhoanChange}
                />
            </div>
            <div>
                <label htmlFor="toa-nha">Tên tòa nhà</label>
                {/* {errorValue2 && <span className={cx('error')}>*Tên tòa nhà là bắt buộc</span>} */}
                <input
                    id="toa-nha"
                    // className={errorValue2 ? cx('error-input') : cx('input')}
                    type="text"
                    value={matKhau}
                    onChange={handleMatKhauChange}
                />
            </div>
            <Button success onClick={handleFormSubmit}>
                Dang ky
            </Button>
        </div>
    );
}

export default Register;
