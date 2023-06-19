import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import Button from '~/components/Button/Button';
import Toast from '~/components/Toast/Toast';
import * as studentManagerService from '~/services/studentManagerService';

function EditStudent() {
    const { id } = useParams();

    const [hoTen, setHoTen] = useState('');
    const [email, setEmail] = useState('');
    const [gioiTinh, setGioiTinh] = useState('');
    const [maSV, setMaSV] = useState('');
    const [ngaySinh, setNgaySinh] = useState('');
    const [soDienThoai, setSoDienThoai] = useState('');

    const [showMessage, setShowMessage] = useState(false);

    const handleHoTenChange = (event) => {
        setHoTen(event.target.value);
    };
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleGioiTinhChange = (event) => {
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

        try {
            await studentManagerService.put(id, data);
        } catch (error) {
            console.error(error);
        }
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

    const onclick = () => {
        setShowMessage(true);
        setTimeout(() => {
            setShowMessage(false);
        }, 3000);
    };

    return (
        <div>
            {showMessage && <Toast message="Lưu thông tin thành công" success />}
            <form onSubmit={handleFormSubmit}>
                <input type="text" value={hoTen} onChange={handleHoTenChange} />
                <input type="text" value={email} onChange={handleEmailChange} />
                <input type="text" value={gioiTinh} onChange={handleGioiTinhChange} />
                <input type="text" value={maSV} onChange={handleMaSVChange} />
                <input type="text" value={ngaySinh} onChange={handleNgaySinhChange} />
                <input type="text" value={soDienThoai} onChange={handleSoDienThoaiChange} />
                <Button outline type="submit" onClick={onclick}>
                    Lưu
                </Button>
            </form>
        </div>
    );
}

export default EditStudent;
