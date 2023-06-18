import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './RoomManager.module.scss';

import Button from '~/components/Button';
import * as roomManagerService from '~/services/roomManagerService';
import config from '~/config';
import Success from '~/components/Success/Success';
import ModalBtn from '~/components/Modal';
import images from '~/assets/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function RoomManager() {
    const [rooms, setRooms] = useState([]);
    const [message, setMessage] = useState('');
    const [deleteRoomId, setDeleteRoomId] = useState(null);

    const handleClose = () => setDeleteRoomId(null);
    const handleShow = (roomId) => setDeleteRoomId(roomId);

    useEffect(() => {
        fetchRooms();
    }, []);

    const fetchRooms = async () => {
        const result = await roomManagerService.getRoom();
        setRooms(result);
        setTimeout(() => {
            setMessage('');
        }, 3000);
    };

    const deleteRoom = async (id) => {
        try {
            const mess = await roomManagerService.remove(id);
            setMessage(mess);
            fetchRooms();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            {!!message && <Success message={message} />}
            <Button
                className={cx('add-room')}
                leftIcon={<FontAwesomeIcon icon={faPlus} />}
                success
                to={config.routes.createRoom}
            >
                Thêm phòng
            </Button>
            {rooms.map((room) => (
                <div className={cx('card-room', 'flex')} key={room.id}>
                    <img className={cx('img-room')} src={images.roomImg} alt="" />
                    <div className={cx('content')}>
                        <div>
                            Tên phòng: <span className={cx('bold')}>{room.tenPhong}</span>
                        </div>
                        <div>
                            Tòa nhà: <span className={cx('bold')}>{room.toaNha}</span>
                        </div>
                        <div>
                            Số lượng tối đa sinh viên: <span className={cx('bold')}>{room.soLuong}</span>
                        </div>
                    </div>

                    <Button
                        leftIcon={<FontAwesomeIcon icon={faPenToSquare} />}
                        className={cx('btn-click')}
                        outline
                        to={`/admin/quan-ly-phong/${room.id}/edit`}
                    >
                        Thay đổi thông tin phòng
                    </Button>
                    <Button
                        leftIcon={<FontAwesomeIcon icon={faTrashCan} />}
                        className={cx('btn-click')}
                        primary
                        onClick={() => handleShow(room.id)}
                    >
                        Xóa phòng
                    </Button>
                    <ModalBtn
                        show={deleteRoomId === room.id}
                        textHeader="Xoá phòng?"
                        textBody="Hành động này không thể khôi phục. Bạn chắc chắn muốn xóa phòng này?"
                        textFooter="Xác nhận"
                        handleClose={handleClose}
                        handleDelete={() => {
                            setDeleteRoomId(null);
                            deleteRoom(room.id);
                        }}
                    />
                </div>
            ))}
        </div>
    );
}

export default RoomManager;
