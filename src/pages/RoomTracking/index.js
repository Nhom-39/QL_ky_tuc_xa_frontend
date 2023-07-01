import { useEffect, useState } from 'react';
import * as studentManagerService from '~/services/studentManagerService';
import * as financialService from '~/services/financialService';

import classNames from 'classnames/bind';
import styles from './RoomTracking.module.scss';
import Btn from '~/components/Button/Button';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Col, Row } from 'react-bootstrap';
import StudentItem from '~/components/StudentItem/StudentItem';
import images from '~/assets/images';

const cx = classNames.bind(styles);

function RoomTracking() {
    const [show, setShow] = useState(false);
    const [showStudents, setShowStudents] = useState(false);

    const [student, setStudent] = useState([]);
    const [students, setStudents] = useState([]);
    const [consumptionDiary, setConsumptionDiary] = useState([]);
    const [bill, setBill] = useState();

    const handleClose = () => {
        setShow(false);
        setBill();
    };
    const handleCloseStudents = () => setShowStudents(false);

    const handleShow = (id_phong) => {
        setShow(true);
        fetchApiFinancial(id_phong);
    };

    const handleDetailBill = (id_tieu_thu) => {
        fetchApiBill(id_tieu_thu);
    };

    const handleStudentListByRoom = (id_phong) => {
        setShowStudents(true);
        fetchApiListStudentByRoom(id_phong);
    };

    useEffect(() => {
        fetchApi();
    }, []);

    const fetchApi = async () => {
        const result = await studentManagerService.getInfoRoom(localStorage.getItem('name'));
        setStudent(result);
    };

    const fetchApiFinancial = async (id_phong) => {
        const result = await financialService.getAllConsumptionDiaryByRoom(id_phong);
        setConsumptionDiary(result);
    };

    const fetchApiBill = async (id_tieu_thu) => {
        const result = await financialService.getBill(id_tieu_thu);
        setBill(result);
    };
    const fetchApiListStudentByRoom = async (id_phong) => {
        const result = await studentManagerService.getListStudentByRoom(id_phong);
        setStudents(result);
    };
    return (
        <div className={cx('wrapper')}>
            {student.room ? (
                <>
                    <div className={cx('banner')}>
                        <span>Thông tin phòng đang ở</span>
                    </div>
                    <Row>
                        <Col lg={2}></Col>
                        <Col lg={4}>
                            <img className={cx('img-room')} src={student.room.image} alt="" />
                        </Col>
                        <Col lg={1}></Col>
                        <Col lg={3} className="margin-auto">
                            <div className={cx('info')}>
                                <div>Tên phòng: {student.room.tenPhong}</div>
                                <div>Tòa nhà: {student.room.toaNha}</div>
                                <div>Giá phòng: {student.room.giaPhong} Đ/tháng</div>
                                <div>Số lượng sinh viên tối đa: {student.room.soLuongMax}</div>
                                <div>Thông tin phòng: {student.room.thongTin}</div>
                                <Btn outline onClick={() => handleShow(student.room.id)} className={cx('btn')}>
                                    Xem thông tin các khoản tiền
                                </Btn>
                                <Modal show={show} onHide={handleClose} size="lg">
                                    <Modal.Header closeButton>
                                        <Modal.Title>Xem thông tin các khoản tiền</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body className={cx('wrapper-modal')}>
                                        <Row className={cx('title')}>
                                            <Col lg={1}>STT</Col>
                                            <Col lg={1}>Tháng</Col>
                                            <Col lg={1}>Điện(số)</Col>
                                            <Col lg={1}>Nước</Col>
                                            <Col lg={2}>Tiền phòng(VND)</Col>
                                            <Col lg={2}>Tổng tiền(VND)</Col>
                                            <Col lg={4}></Col>
                                        </Row>
                                        {consumptionDiary.map((cd, i) => (
                                            <Row key={cd.id} className={cx('items-center', 'items')}>
                                                <Col lg={1}>
                                                    <span className={cx('bold')}>{i + 1}</span>
                                                </Col>
                                                <Col lg={1}>
                                                    <span className={cx('bold')}>{cd.thang}</span>
                                                </Col>
                                                <Col lg={1}>
                                                    <span className={cx('bold')}>{cd.soLuongDien}</span>
                                                </Col>
                                                <Col lg={1}>
                                                    <span className={cx('bold')}>{cd.soLuongNuoc}</span>
                                                </Col>
                                                <Col lg={2}>
                                                    <span className={cx('bold')}>{cd.room.giaPhong}</span>
                                                </Col>
                                                <Col lg={2}>
                                                    <span className={cx('bold')}>
                                                        {cd.soLuongNuoc * 15000 +
                                                            cd.soLuongDien * 2500 +
                                                            cd.room.giaPhong}
                                                    </span>
                                                </Col>
                                                <Col lg={4}>
                                                    <Btn small outline onClick={() => handleDetailBill(cd.id)}>
                                                        Xem hóa đơn
                                                    </Btn>
                                                    {bill && bill.consumptionDiary.id === cd.id ? (
                                                        <div className={cx('wrapper-bill')}>
                                                            <div>Số tiền: {bill.soTien}</div>
                                                            <div>Ngày thu: {bill.ngayThu}</div>{' '}
                                                            <div>Ghi chú: {bill.ghiChu}</div>
                                                        </div>
                                                    ) : (
                                                        <></>
                                                    )}
                                                </Col>
                                            </Row>
                                        ))}
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>
                                            Close
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                                <div></div>
                                <Btn
                                    success
                                    onClick={() => handleStudentListByRoom(student.room.id)}
                                    className={cx('btn')}
                                >
                                    Xem danh sách sinh viên trong phòng
                                </Btn>
                                <Modal show={showStudents} onHide={handleCloseStudents}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Xem danh sách sinh viên trong phòng</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body className={cx('wrapper-modal')}>
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
                                                            <img
                                                                className={cx('avatar')}
                                                                src={images.avatarNam}
                                                                alt=""
                                                            />
                                                        )}
                                                        {student.gioiTinh === 'Nữ' && (
                                                            <img
                                                                className={cx('avatar')}
                                                                src={images.avatarNu}
                                                                alt=""
                                                            />
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
                                        <Button variant="secondary" onClick={handleCloseStudents}>
                                            Close
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            </div>
                        </Col>
                        <Col lg={2}></Col>
                    </Row>
                </>
            ) : (
                <div></div>
            )}

            {student.roomRegister && !student.room ? (
                <>
                    <div className={cx('banner')}>
                        <span>Thông tin phòng đăng ký</span>
                    </div>
                    <Row>
                        <Col lg={2}></Col>
                        <Col lg={4}>
                            <img className={cx('img-room')} src={student.roomRegister.image} alt="" />
                        </Col>
                        <Col lg={1}></Col>
                        <Col lg={3} className="margin-auto">
                            <div className={cx('info')}>
                                <div>Tên phòng: {student.roomRegister.tenPhong}</div>
                                <div>Tòa nhà: {student.roomRegister.toaNha}</div>
                                <div>Giá phòng: {student.roomRegister.giaPhong} Đ/tháng</div>
                                <div>Số lượng sinh viên tối đa: {student.roomRegister.soLuongMax}</div>
                                <div>Thông tin phòng: {student.roomRegister.thongTin}</div>
                            </div>
                        </Col>
                        <Col lg={2}></Col>
                    </Row>
                </>
            ) : (
                <div></div>
            )}

            {!student.roomRegister && !student.room ? (
                <>
                    <div className={cx('banner')}>
                        <span>Chưa có thông tin về phòng đăng ký và phòng đang ở</span>
                    </div>
                </>
            ) : (
                <div></div>
            )}
        </div>
    );
}

export default RoomTracking;
