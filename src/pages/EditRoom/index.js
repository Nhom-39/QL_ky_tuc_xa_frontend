import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import Button from '~/components/Button/Button';
import Toast from '~/components/Toast/Toast';

import * as roomManagerService from '~/services/roomManagerService';

function EditRoom() {
    const { id } = useParams();

    const [tenPhong, setTenPhong] = useState('');
    const [toaNha, setToaNha] = useState('');
    const [soLuongMax, setSoLuongMax] = useState('');

    const [showMessage, setShowMessage] = useState(false);

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
            id: id,
            tenPhong: tenPhong,
            toaNha: toaNha,
            soLuongMax: soLuongMax,
        };

        try {
            await roomManagerService.put(id, data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const fetchApi = async () => {
            const result = await roomManagerService.edit(id);
            setTenPhong(result.tenPhong);
            setToaNha(result.toaNha);
            setSoLuongMax(result.soLuongMax);
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
                <input type="text" value={tenPhong} onChange={handleTenPhongChange} />
                <input type="text" value={toaNha} onChange={handleToaNhaChange} />
                <input type="text" value={soLuongMax} onChange={handleSoLuongMaxChange} />
                <Button type="submit" onClick={onclick}>
                    Lưu
                </Button>
            </form>
        </div>
    );
}

export default EditRoom;
