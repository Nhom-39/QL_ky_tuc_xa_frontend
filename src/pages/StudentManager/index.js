import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import * as studentManagerService from '~/services/studentManagerService';

import Button from '~/components/Button/Button';
import Success from '~/components/Success/Success';
import ModalBtn from '~/components/Modal';
import SearchRoom from '~/components/SearchRoom';
import images from '~/assets/images';
import styles from './StudentManager.module.scss';
import StudentItem from '~/components/StudentItem/StudentItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCheckCircle,
    faCheckToSlot,
    faPenToSquare,
    faPersonCircleMinus,
    faTrashCan,
    faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const cx = classNames.bind(styles);

function StudentManager() {
    const [students, setStudents] = useState([]);
    const [message, setMessage] = useState('');
    const [deleteStudentId, setDeleteStudentId] = useState(null);
    const [deleteRoomFromStudentId, setDeleteRoomFromStudentId] = useState(null);
    const [roomId, setRoomId] = useState(null);
    const [tenPhong, setTenPhong] = useState('');
    const [toaNha, setToaNha] = useState('');
    const [soLuong, setSoLuong] = useState();
    const [showSearchRoom, setShowSearchRoom] = useState(false);
    const [showClickSearchRoom, setShowClickSearchRoom] = useState(false);

    const [addStudentId, setAddStudentId] = useState(null);

    const handleClose = () => setDeleteStudentId(null);
    const handleShow = (studentId) => setDeleteStudentId(studentId);
    const handleCloseDeleteRoom = () => setDeleteRoomFromStudentId(null);

    const handleShowDeleteRoom = (studentId) => setDeleteRoomFromStudentId(studentId);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        const result = await studentManagerService.getStudents();
        setStudents(result);
        setTimeout(() => {
            setMessage('');
        }, 3000);
    };

    const deleteStudent = async (id) => {
        try {
            const mess = await studentManagerService.remove(id);
            setMessage(mess);
            fetchStudents();
        } catch (error) {
            console.error(error);
        }
    };

    const handleAddStudenToRoom = async (id, roomId) => {
        try {
            await studentManagerService.addStudentToRoom(id, roomId);
        } catch (error) {
            console.error(error);
        }
    };

    const handleRoomClick = (id_phong, ten_phong, toa_nha, so_luong) => {
        setRoomId(id_phong);
        setTenPhong(ten_phong);
        setToaNha(toa_nha);
        setSoLuong(so_luong);
        setShowClickSearchRoom(true);
    };

    const handleRemoveStudenToRoom = async (id) => {
        try {
            await studentManagerService.RemoveStudentToRoom(id);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Container>
            {!!message && <Success message={message} />}
            {students.map((student) => (
                <Row className={cx('card-student', 'flex')} key={student.id}>
                    <Col xs="3">
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
                    </Col>
                    <Col xs="4">
                        <Button
                            leftIcon={<FontAwesomeIcon icon={faPenToSquare} />}
                            className={cx('btn-click')}
                            outline
                            to={`/admin/quan-ly-sinh-vien/${student.id}/edit`}
                        >
                            Sửa thông tin
                        </Button>
                        <Button
                            leftIcon={<FontAwesomeIcon icon={faTrashCan} />}
                            className={cx('btn-click')}
                            primary
                            onClick={() => handleShow(student.id)}
                        >
                            Xóa tài khoản
                        </Button>
                    </Col>
                    <ModalBtn
                        show={deleteStudentId === student.id}
                        textHeader="Xóa sinh viên?"
                        textBody="Hành động này không thể khôi phục. Bạn chắc chắn muốn xóa sinh viên này?"
                        textFooter="Xác nhận"
                        handleClose={handleClose}
                        handleDelete={() => {
                            setDeleteStudentId(null);
                            deleteStudent(student.id);
                        }}
                    />
                    <Col>
                        {student.room === null && addStudentId !== student.id && (
                            <div className={cx('flex', 'items-center')}>
                                <Col xs="6" className={cx('warning')}>
                                    <FontAwesomeIcon icon={faTriangleExclamation} /> Sinh viên chưa có phòng
                                </Col>
                                <Col xs="6">
                                    <Button
                                        leftIcon={<FontAwesomeIcon icon={faCheckToSlot} />}
                                        success
                                        className={cx('btn-click', 'btn-width')}
                                        onClick={() => {
                                            setShowSearchRoom(true);
                                            setAddStudentId(student.id);
                                        }}
                                    >
                                        Chọn phòng cho sinh viên
                                    </Button>
                                </Col>
                            </div>
                        )}

                        {student.room != null && (
                            <div className={cx('flex', 'items-center')}>
                                <Col xs="6" className={cx('succses')}>
                                    <FontAwesomeIcon icon={faCheckCircle} /> Sinh viên đã có phòng
                                </Col>
                                <Col xs="6">
                                    <Button
                                        leftIcon={<FontAwesomeIcon icon={faPersonCircleMinus} />}
                                        className={cx('btn-click', 'btn-width')}
                                        primary
                                        onClick={() => handleShowDeleteRoom(student.id)}
                                    >
                                        Xóa sinh viên khỏi phòng
                                    </Button>
                                </Col>
                            </div>
                        )}
                        <ModalBtn
                            show={deleteRoomFromStudentId === student.id}
                            textHeader="Xóa sinh viên ra khỏi phòng?"
                            textBody="Hành động này không thể khôi phục. Bạn chắc chắn muốn xóa sinh viên ra khỏi phòng này?"
                            textFooter="Xác nhận"
                            handleClose={handleCloseDeleteRoom}
                            handleDelete={() => {
                                setDeleteRoomFromStudentId(null);
                                handleRemoveStudenToRoom(student.id);
                            }}
                        />

                        {showSearchRoom && addStudentId === student.id && (
                            <div>
                                <SearchRoom onRoomClick={handleRoomClick} />

                                {showClickSearchRoom && (
                                    <>
                                        <div className={cx('wrapper', 'flex')}>
                                            <img className={cx('img-room')} src={images.roomImg} alt="" />
                                            <p className={cx('content')}>Phòng: {tenPhong}</p>
                                            <p className={cx('content')}>Thuộc tòa nhà: {toaNha}</p>
                                            <p className={cx('content')}>Số lượng max: {soLuong}</p>
                                        </div>
                                        <Button
                                            className={cx('btn-click')}
                                            outline
                                            onClick={() => handleAddStudenToRoom(student.id, roomId)}
                                        >
                                            Thêm sinh viên
                                        </Button>
                                    </>
                                )}
                            </div>
                        )}
                    </Col>
                </Row>
            ))}
        </Container>
    );
}

export default StudentManager;
