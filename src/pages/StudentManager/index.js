import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import * as studentManagerService from '~/services/studentManagerService';

import Button from '~/components/Button/Button';
import Toast from '~/components/Toast';
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
import { faCheckSquare } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(styles);

function StudentManager() {
    const [students, setStudents] = useState([]);
    const [message, setMessage] = useState('');
    const [error, setError] = useState(false);
    const [deleteStudentId, setDeleteStudentId] = useState(null);
    const [deleteRoomFromStudentId, setDeleteRoomFromStudentId] = useState(null);
    const [roomId, setRoomId] = useState(null);
    const [tenPhong, setTenPhong] = useState('');
    const [toaNha, setToaNha] = useState('');
    const [soLuongMax, setSoLuongMax] = useState();
    const [image, setImage] = useState();
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
            const result = await studentManagerService.addStudentToRoom(id, roomId);
            if (result) {
                setMessage('Thêm sinh viên vào phòng thành công');
            } else {
                setMessage('Phòng đã đầy');
                setError(true);
            }

            fetchStudents();
        } catch (error) {
            console.log(error);
        }
    };

    const handleRoomClick = (id_phong, ten_phong, toa_nha, so_luong, image) => {
        setRoomId(id_phong);
        setTenPhong(ten_phong);
        setToaNha(toa_nha);
        setSoLuongMax(so_luong);
        console.log(so_luong);
        setImage(image);
        setShowClickSearchRoom(true);
    };

    const handleRemoveStudenToRoom = async (id) => {
        try {
            await studentManagerService.RemoveStudentToRoom(id);
            setMessage('Xóa sinh viên khỏi phòng thành công');
            setError(false);
            fetchStudents();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Container>
            {!!message && !error && <Toast message={message} success />}
            {!!message && error && <Toast message={message} error />}
            {students.map((student) => (
                <Row className={cx('card-student', 'flex')} key={student.id}>
                    <Col lg="3">
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
                    <Col lg="4">
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
                        {student.room === null && (
                            <div className={cx('flex', 'items-center')}>
                                {student.roomRegister === null ? (
                                    <Col lg="6" className={cx('warning')}>
                                        <FontAwesomeIcon icon={faTriangleExclamation} /> Sinh viên chưa có phòng
                                    </Col>
                                ) : (
                                    <Col lg={6}>
                                        Sinh viên đăng ký vào phòng:
                                        <div className={cx('div-room', 'flex')}>
                                            <img className={cx('img-room')} src={student.roomRegister.image} alt="" />
                                            <div className={cx('info-room')}>
                                                <div>Phòng: {student.roomRegister.tenPhong}</div>
                                                <div>
                                                    Thuộc tòa nhà:
                                                    {student.roomRegister.toaNha}
                                                </div>
                                            </div>
                                        </div>
                                        <Button
                                            small
                                            success
                                            onClick={() => {
                                                handleAddStudenToRoom(student.id, student.roomRegister.id);
                                            }}
                                        >
                                            Chấp nhận
                                        </Button>
                                    </Col>
                                )}
                                <Col lg="6">
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
                                <Col lg="6" className={cx('succses')}>
                                    <FontAwesomeIcon icon={faCheckCircle} /> Sinh viên đã có phòng
                                </Col>
                                <Col lg="6">
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
                                setError(false);
                            }}
                        />

                        {showSearchRoom && addStudentId === student.id && (
                            <div>
                                <SearchRoom onRoomClick={handleRoomClick} />

                                {showClickSearchRoom && (
                                    <>
                                        <div className={cx('wrapper', 'flex')}>
                                            <FontAwesomeIcon icon={faCheckSquare} />
                                            <img className={cx('img-room')} src={image} alt="" />
                                            <div className={cx('content')}>
                                                Phòng: {tenPhong}.&nbsp; Thuộc tòa nhà: {toaNha}. &nbsp; Số lượng max:{' '}
                                                {soLuongMax}.
                                            </div>
                                        </div>
                                        <Button
                                            className={cx('btn-click')}
                                            outline
                                            onClick={() => {
                                                handleAddStudenToRoom(student.id, roomId);
                                                setShowSearchRoom(false);
                                            }}
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
