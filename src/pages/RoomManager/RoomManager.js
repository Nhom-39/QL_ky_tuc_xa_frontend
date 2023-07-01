import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import styles from './RoomManager.module.scss';

import Btn from '~/components/Button';
import * as roomManagerService from '~/services/roomManagerService';
import * as studentManagerService from '~/services/studentManagerService';
import config from '~/config';
import Success from '~/components/Toast/Toast';
import ModalBtn from '~/components/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import StudentItem from '~/components/StudentItem/StudentItem';
import images from '~/assets/images';

const cx = classNames.bind(styles);

function RoomManager() {
    const [rooms, setRooms] = useState([]);
    const [students, setStudents] = useState([]);
    const [message, setMessage] = useState('');
    const [deleteRoomId, setDeleteRoomId] = useState(null);
    const [roomId, setRoomId] = useState(null);

    const handleCloseStudent = () => setRoomId(null);
    const handleShowStudent = (roomId) => {
        setRoomId(roomId);
        fetchStudents(roomId);
    };

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

    const fetchStudents = async (roomId) => {
        const result = await studentManagerService.getListStudentByRoom(roomId);
        setStudents(result);
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
            <Btn
                className={cx('add-room')}
                leftIcon={<FontAwesomeIcon icon={faPlus} />}
                success
                to={config.routes.createRoom}
            >
                Thêm phòng
            </Btn>
            {rooms.map((room) => (
                <div className={cx('card-room', 'flex')} key={room.id}>
                    <img className={cx('img-room')} src={room.image} alt="" />
                    <div className={cx('content')}>
                        <div>
                            Tên phòng: <span className={cx('bold')}>{room.tenPhong}</span>
                        </div>
                        <div>
                            Tòa nhà: <span className={cx('bold')}>{room.toaNha}</span>
                        </div>
                        <div>
                            Số lượng tối đa sinh viên: <span className={cx('bold')}>{room.soLuongMax}</span>
                        </div>
                    </div>
                    <>
                        <Btn onClick={() => handleShowStudent(room.id)} className={cx('btn-click')} outline>
                            Xem danh sách sinh viên
                        </Btn>
                        <Modal show={roomId === room.id} onHide={handleCloseStudent}>
                            <Modal.Header closeButton>
                                <Modal.Title>
                                    Xem danh sách sinh viên: Phòng {room.tenPhong} - Tòa nhà {room.toaNha}
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body className={cx('wrapper-student')}>
                                {students.map((student) => (
                                    <div key={student.id}>
                                        <StudentItem
                                            data={[
                                                student.hoTen,
                                                student.maSV,
                                                student.gioiTinh,
                                                student.ngaySinh,
                                                student.email,
                                                student.soDienThoai,
                                                student.room,
                                            ]}
                                        >
                                            <div className="flex">
                                                {student.gioiTinh === 'Nam' && (
                                                    <img className={cx('avatar')} src={images.avatarNam} alt="" />
                                                )}
                                                {student.gioiTinh === 'Nữ' && (
                                                    <img className={cx('avatar')} src={images.avatarNu} alt="" />
                                                )}
                                                <div>
                                                    <span>{student.hoTen}</span>
                                                    <p>{student.maSV}</p>
                                                </div>
                                            </div>
                                        </StudentItem>
                                    </div>
                                ))}
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleCloseStudent}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </>
                    <Btn
                        leftIcon={<FontAwesomeIcon icon={faPenToSquare} />}
                        className={cx('btn-click')}
                        outline
                        to={`/admin/quan-ly-phong/${room.id}/edit`}
                    >
                        Thay đổi thông tin phòng
                    </Btn>
                    <Btn
                        leftIcon={<FontAwesomeIcon icon={faTrashCan} />}
                        className={cx('btn-click')}
                        primary
                        onClick={() => handleShow(room.id)}
                    >
                        Xóa phòng
                    </Btn>
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
