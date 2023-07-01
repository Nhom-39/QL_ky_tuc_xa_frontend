import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import classNames from 'classnames/bind';

import styles from './FinancialManager.module.scss';

import Btn from '~/components/Button/Button';
import ModalBtn from '~/components/Modal';
import * as financialService from '~/services/financialService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import SearchRoom from '~/components/SearchRoom';
import { Col, Row } from 'react-bootstrap';

const cx = classNames.bind(styles);

function FinancialManager() {
    const [cdId, setCdId] = useState(null);
    const [showAdd, setShowAdd] = useState(false);
    const [thang, setThang] = useState('');
    const [soLuongDien, setSoLuongDien] = useState('');
    const [soLuongNuoc, setSoLuongNuoc] = useState('');
    const [roomId, setRoomId] = useState(null);
    const [tenPhong, setTenPhong] = useState('');
    const [toaNha, setToaNha] = useState('');
    const [soLuongMax, setSoLuongMax] = useState();
    const [image, setImage] = useState();
    const [showClickSearchRoom, setShowClickSearchRoom] = useState(false);

    const [ngayThu, setNgayThu] = useState('');
    const [soTien, setSoTien] = useState('');
    const [ghiChu, setGhiChu] = useState('');

    const [consumptionDiary, setConsumptionDiary] = useState([]);

    const [deleteId, setDeleteId] = useState(null);

    const handleShowModalDelete = (Id) => setDeleteId(Id);
    // const [error, setError] = useState('');

    const handleThangChange = (e) => {
        setThang(e.target.value);
    };
    const handleSoLuongDienChange = (e) => {
        setSoLuongDien(e.target.value);
    };
    const handleSoLuongNuocChange = (e) => {
        setSoLuongNuoc(e.target.value);
    };

    const handleNgayThuChange = (e) => {
        setNgayThu(e.target.value);
    };
    const handleSoTienChange = (e) => {
        setSoTien(e.target.value);
    };
    const handleGhiChuChange = (e) => {
        setGhiChu(e.target.value);
    };

    const handleClose = () => setCdId(null);
    const handleShow = (cdId) => setCdId(cdId);

    const handleCloseAdd = () => setShowAdd(false);
    const handleShowAdd = () => setShowAdd(true);

    const handleFormSubmitAdd = async () => {
        const data = {
            thang: thang,
            soLuongDien: soLuongDien,
            soLuongNuoc: soLuongNuoc,
        };
        console.log(data);
        if (thang !== '' && soLuongDien !== '' && soLuongNuoc !== '' && roomId !== '') {
            try {
                await financialService.postCreateConsumption(roomId, data);
                setShowAdd(false);
            } catch (error) {
                console.error(error);
            }
            // setMessage('Lưu thông tin sinh viên thành công');
        } else {
            // if (hoTen === '') setErrorValue1(true);
            // if (email === '') setErrorValue2(true);
            // setMessage('Các trường chưa được nhập đầy đủ thông tin');
            // setError(true);
        }
        setTimeout(() => {
            // setMessage('');
        }, 3000);
    };

    const handleFormSubmit = async (id_tieu_thu) => {
        const data = {
            ngayThu: ngayThu,
            soTien: soTien,
            ghiChu: ghiChu,
        };

        if (ngayThu !== '' && soTien !== '' && ghiChu !== '') {
            try {
                await financialService.postCashCollection(id_tieu_thu, data);
            } catch (error) {
                console.error(error);
            }
            setCdId(null);
            // setMessage('Lưu thông tin sinh viên thành công');
        } else {
            // if (hoTen === '') setErrorValue1(true);
            // if (email === '') setErrorValue2(true);
            // setMessage('Các trường chưa được nhập đầy đủ thông tin');
            // setError(true);
        }
        setTimeout(() => {
            // setMessage('');
        }, 3000);
    };
    useEffect(() => {
        fetchApi();
    }, []);
    const fetchApi = async () => {
        const result = await financialService.getAllConsumption();
        setConsumptionDiary(result);
    };

    const deleteConsumption = async (id) => {
        try {
            const mess = await financialService.removeConsumption(id);
            // setMessage(mess);
            fetchApi();
        } catch (error) {
            console.error(error);
        }
    };

    const handleRoomClick = (id_phong, ten_phong, toa_nha, so_luong_max, image) => {
        setRoomId(id_phong);
        setTenPhong(ten_phong);
        setToaNha(toa_nha);
        setSoLuongMax(so_luong_max);
        setImage(image);
        setShowClickSearchRoom(true);
    };

    return (
        <div className={cx('wrapper')}>
            <Btn onClick={handleShowAdd} success className={cx('margin')}>
                Thêm khoản thu
            </Btn>
            <Modal show={showAdd} onHide={handleCloseAdd}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm khoản thu mới</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <span>Chọn phòng</span>
                    <SearchRoom onRoomClick={handleRoomClick} />
                    {showClickSearchRoom && (
                        <div className={cx('room', 'flex')}>
                            <FontAwesomeIcon icon={faCheckSquare} />
                            <img className={cx('img-room')} src={image} alt="" />
                            <div className={cx('content')}>
                                Phòng: {tenPhong}.&nbsp; Thuộc tòa nhà: {toaNha}. Số lượng max: {soLuongMax}.
                            </div>
                        </div>
                    )}
                    <Form className={cx('m-top')}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Tháng</Form.Label>
                            <Form.Control type="number" onChange={handleThangChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Điện(số)</Form.Label>
                            <Form.Control type="number" onChange={handleSoLuongDienChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Nước(khối)</Form.Label>
                            <Form.Control type="number" onChange={handleSoLuongNuocChange} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseAdd}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleFormSubmitAdd()}>
                        Xác nhận
                    </Button>
                </Modal.Footer>
            </Modal>
            <Row className={cx('title', 'items-center')}>
                <Col lg={3}>Phòng</Col>
                <Col lg={1}>Tháng</Col>
                <Col lg={1}>Điện (số)</Col>
                <Col lg={1}>Nước (Khối)</Col>
                <Col lg={1}>Tiền phòng</Col>
                <Col lg={1}>Tổng tiền (VND)</Col>
            </Row>
            {consumptionDiary.map((cd) => (
                <Row key={cd.id} className={cx('items-center', 'items')}>
                    <Col lg={3}>
                        <img className={cx('image')} src={cd.room.image} alt="" />
                        <span>
                            Phòng {cd.room.tenPhong} - Tòa nhà {cd.room.toaNha}
                        </span>
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
                    <Col lg={1}>
                        <span className={cx('bold')}>{cd.room.giaPhong}</span>
                    </Col>
                    <Col lg={1}>
                        <span className={cx('bold')}>
                            {cd.soLuongNuoc * 15000 + cd.soLuongDien * 2500 + cd.room.giaPhong}
                        </span>
                    </Col>

                    <Col lg={2}>
                        <Btn outline onClick={() => handleShow(cd.id)}>
                            Xác nhận thu tiền
                        </Btn>
                        <Modal show={cdId === cd.id} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>
                                    Xác nhận thu tiền: Phòng {cd.room.tenPhong} - Tòa nhà {cd.room.toaNha}
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                        <Form.Label>Ngày thu</Form.Label>
                                        <Form.Control type="date" onChange={handleNgayThuChange} />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                        <Form.Label>Số tiền</Form.Label>
                                        <Form.Control type="number" onChange={handleSoTienChange} />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                        <Form.Label>Ghi chú</Form.Label>
                                        <Form.Control as="textarea" onChange={handleGhiChuChange} />
                                    </Form.Group>
                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                                <Button
                                    variant="primary"
                                    onClick={() => {
                                        handleFormSubmit(cd.id);
                                    }}
                                >
                                    Gửi
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </Col>

                    <Col lg={2}>
                        <Btn
                            leftIcon={<FontAwesomeIcon icon={faTrashCan} />}
                            className={cx('btn-click')}
                            primary
                            onClick={() => handleShowModalDelete(cd.id)}
                        >
                            Xóa khoản thu
                        </Btn>
                        <ModalBtn
                            show={deleteId === cd.id}
                            textHeader="Xoá khoản thu?"
                            textBody="Hành động này không thể khôi phục. Bạn chắc chắn muốn xóa phản hồi này?"
                            textFooter="Xác nhận"
                            handleClose={() => setDeleteId(null)}
                            handleDelete={() => {
                                setDeleteId(null);
                                deleteConsumption(cd.id);
                            }}
                        />
                    </Col>
                </Row>
            ))}
        </div>
    );
}

export default FinancialManager;
