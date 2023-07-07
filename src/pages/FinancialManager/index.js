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
import Toast from '~/components/Toast/Toast';
import ModalShow from '~/components/ModelShow';

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

    const [message, setMessage] = useState(false);
    const [error, setError] = useState(false);
    const [errorValue1, setErrorValue1] = useState(false);
    const [errorValue2, setErrorValue2] = useState(false);
    const [errorValue3, setErrorValue3] = useState(false);
    const [errorValue4, setErrorValue4] = useState(false);
    const [errorValue5, setErrorValue5] = useState(false);
    const [errorValue6, setErrorValue6] = useState(false);
    const [errorValue7, setErrorValue7] = useState(false);

    const [ngayThu, setNgayThu] = useState('');
    const [soTien, setSoTien] = useState('');
    const [ghiChu, setGhiChu] = useState('');

    const [consumptionDiary, setConsumptionDiary] = useState([]);

    const [deleteId, setDeleteId] = useState(null);
    const [cdShowId, setCdShowId] = useState(null);
    const [cashCollectionDiary, setCashCollectionDiary] = useState({});

    const handleShowModalDelete = (Id) => setDeleteId(Id);

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
                setMessage('Tạo khoản thu thành công');
                fetchApi();
            } catch (error) {
                console.error(error);
            }
        } else {
            if (thang === '') {
                setErrorValue1(true);
            } else setErrorValue1(false);
            if (soLuongDien === '') {
                setErrorValue2(true);
            } else setErrorValue2(false);
            if (soLuongNuoc === '') {
                setErrorValue3(true);
            } else setErrorValue3(false);
            if (roomId === null) {
                setErrorValue4(true);
            } else setErrorValue4(false);
            setMessage('Các trường chưa được nhập đầy đủ thông tin');
            setError(true);
        }
        setTimeout(() => {
            setMessage('');
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
                const result = await financialService.postCashCollection(id_tieu_thu, data);
                setMessage(result);
                setCdId(null);
            } catch (error) {
                console.error(error);
            }
        } else {
            if (ngayThu === '') {
                setErrorValue5(true);
            } else setErrorValue5(false);
            if (soTien === '') {
                setErrorValue6(true);
            } else setErrorValue6(false);
            if (ghiChu === '') {
                setErrorValue7(true);
            } else setErrorValue7(false);
            setMessage('Các trường chưa được nhập đầy đủ thông tin');
            setError(true);
        }
        setTimeout(() => {
            setMessage('');
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
            setMessage(mess);
            setTimeout(() => {
                setMessage('');
            }, 3000);
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

    const handleShowBill = async (id_tieu_thu) => {
        try {
            const result = await financialService.getBill(id_tieu_thu);
            if (result === '') {
                setMessage('Khoản thu chưa được thanh toán.');
                setError(true);
                setTimeout(() => {
                    setMessage('');
                }, 3000);
            } else {
                setCashCollectionDiary(result);
                setCdShowId(id_tieu_thu);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleCloseBill = () => {
        setCdShowId(null);
    };

    return (
        <div className={cx('wrapper')}>
            {!!message && !error && <Toast message={message} success />}
            {!!message && error && <Toast message={message} error />}
            <Btn onClick={handleShowAdd} success className={cx('margin')}>
                Thêm khoản thu
            </Btn>
            <Modal show={showAdd} onHide={handleCloseAdd}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm khoản thu mới</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <span>Chọn phòng</span>
                    {errorValue4 && <span className={cx('error-room')}>{'  '}(*Bạn chưa chọn phòng)</span>}
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
                            <Form.Control
                                className={errorValue1 ? cx('error-input') : ''}
                                type="number"
                                onChange={handleThangChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Điện(số)</Form.Label>
                            <Form.Control
                                className={errorValue2 ? cx('error-input') : ''}
                                type="number"
                                onChange={handleSoLuongDienChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Nước(khối)</Form.Label>
                            <Form.Control
                                className={errorValue3 ? cx('error-input') : ''}
                                type="number"
                                onChange={handleSoLuongNuocChange}
                            />
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
                <Col lg={2}>Phòng</Col>
                <Col lg={1}>Tháng</Col>
                <Col lg={1}>Điện (số)</Col>
                <Col lg={1}>Nước (Khối)</Col>
                <Col lg={1}>Tiền phòng</Col>
                <Col lg={1}>Tổng tiền (VND)</Col>
            </Row>
            {consumptionDiary.map((cd) => (
                <Row key={cd.id} className={cx('items-center', 'items')}>
                    <Col lg={2}>
                        <img className={cx('image')} src={cd.room.image} alt="" />
                        <span>
                            Phòng {cd.room.tenPhong} - Tòa {cd.room.toaNha}
                        </span>
                    </Col>
                    <Col lg={1}>
                        <span className={cx('m-left')}>{cd.thang}</span>
                    </Col>
                    <Col lg={1}>
                        <span className={cx('m-left')}>{cd.soLuongDien}</span>
                    </Col>
                    <Col lg={1}>
                        <span className={cx('m-left')}>{cd.soLuongNuoc}</span>
                    </Col>
                    <Col lg={1}>
                        <span className={cx('m-left')}>{cd.room.giaPhong}</span>
                    </Col>
                    <Col lg={1}>
                        <span>{cd.soLuongNuoc * 15000 + cd.soLuongDien * 2500 + cd.room.giaPhong}</span>
                    </Col>

                    <Col lg={2}>
                        <ModalShow
                            show={cdShowId === cd.id}
                            handleShow={() => handleShowBill(cd.id)}
                            handleClose={handleCloseBill}
                            textButton="Xem hóa đơn"
                            textHeader={
                                'Xem hóa đơn phòng ' + cd.room.tenPhong + ' - ' + cd.room.toaNha + ' Tháng ' + cd.thang
                            }
                            body={
                                <>
                                    {<p>Ngày thu: {cashCollectionDiary.ngayThu}</p>}
                                    {<p>Số tiền: {cashCollectionDiary.soTien}</p>}
                                    {<p>Ghi chú: {cashCollectionDiary.ghiChu}</p>}
                                </>
                            }
                        />
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
                                        <Form.Control
                                            className={errorValue5 ? cx('error-input') : ''}
                                            type="date"
                                            onChange={handleNgayThuChange}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                        <Form.Label>Số tiền</Form.Label>
                                        <Form.Control
                                            className={errorValue6 ? cx('error-input') : ''}
                                            type="number"
                                            onChange={handleSoTienChange}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                        <Form.Label>Ghi chú</Form.Label>
                                        <Form.Control
                                            className={errorValue7 ? cx('error-input') : ''}
                                            as="textarea"
                                            onChange={handleGhiChuChange}
                                        />
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
                                    Xác nhận
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </Col>

                    <Col lg={1}>
                        <Btn
                            leftIcon={<FontAwesomeIcon icon={faTrashCan} />}
                            className={cx('btn-click')}
                            primary
                            onClick={() => handleShowModalDelete(cd.id)}
                        >
                            Xóa
                        </Btn>
                        <ModalBtn
                            show={deleteId === cd.id}
                            textHeader="Xoá khoản thu?"
                            textBody="Hành động này không thể khôi phục. Bạn chắc chắn muốn xóa khoản thu này này?"
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
