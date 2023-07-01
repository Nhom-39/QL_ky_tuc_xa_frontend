import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import classNames from 'classnames/bind';

import styles from './FeedbackManager.module.scss';

import Btn from '~/components/Button/Button';
import ModalBtn from '~/components/Modal';
import * as feedbackService from '~/services/feedbackService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { Col, Row } from 'react-bootstrap';
import StudentItem from '~/components/StudentItem/StudentItem';
import images from '~/assets/images';

const cx = classNames.bind(styles);
function FeedbackManager() {
    const [traLoi, setTraLoi] = useState('');
    const [feedbacks, setFeedBacks] = useState([]);
    const [feedbackId, setFeedbackId] = useState(null);

    const [deleteFeedbackId, setDeleteFeedbackId] = useState(null);

    const handleCloseModalDelete = () => setDeleteFeedbackId(null);
    const handleShowModalDelete = (feedbackId) => setDeleteFeedbackId(feedbackId);
    // const [error, setError] = useState('');

    const handleTraLoiChange = (e) => {
        setTraLoi(e.target.value);
    };

    const handleClose = () => setFeedbackId(null);
    const handleShow = (feedbackId) => setFeedbackId(feedbackId);
    const handleFormSubmit = async (id) => {
        const data = {
            traLoi: traLoi,
        };

        if (traLoi !== '') {
            try {
                await feedbackService.put(id, data);
            } catch (error) {
                console.error(error);
            }
            setFeedbackId(null);
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
        const result = await feedbackService.getFeedbackAll();
        setFeedBacks(result);
    };

    const deleteFeedback = async (id) => {
        try {
            const mess = await feedbackService.remove(id);
            // setMessage(mess);
            fetchApi();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={cx('margin')}>
            <Row className={cx('title-page')}>Phản hồi ý kiến</Row>
            <Row className={cx('content', 'items-center')}>
                <Col lg={1}>Sinh viên</Col>
                <Col lg={2}>Tiêu đề</Col>
                <Col lg={3}>Nội Dung Gửi</Col>
                <Col lg={3}>Nội dung trả lời</Col>
                <Col lg={1}>Thao tác</Col>
                <Col lg={2}>Xóa</Col>
            </Row>
            {feedbacks.map((feedback) => (
                <Row className={cx('wrapper', 'flex', 'items-center')} key={feedback.id}>
                    <Col lg={1}>
                        <StudentItem
                            data={[
                                feedback.student.hoTen,
                                feedback.student.maSV,
                                feedback.student.gioiTinh,
                                feedback.student.ngaySinh,
                                feedback.student.email,
                                feedback.student.soDienThoai,
                                feedback.student.room,
                            ]}
                        >
                            <div className="flex">
                                {feedback.student.gioiTinh === 'Nam' && (
                                    <img className={cx('avatar')} src={images.avatarNam} alt="" />
                                )}
                                {feedback.student.gioiTinh === 'Nữ' && (
                                    <img className={cx('avatar')} src={images.avatarNu} alt="" />
                                )}
                                <div>
                                    <span>{feedback.student.hoTen}</span>
                                    <p>{feedback.student.maSV}</p>
                                </div>
                            </div>
                        </StudentItem>
                    </Col>
                    <Col lg={2}>
                        <span className={cx('bold')}>{feedback.tieuDe}</span>
                    </Col>
                    <Col lg={3}>
                        <span className={cx('bold')}>{feedback.noiDung}</span>
                    </Col>
                    <Col lg={3}>
                        <span className={cx('bold')}>{feedback.traLoi}</span>
                    </Col>

                    <Col lg={1}>
                        <Btn outline onClick={() => handleShow(feedback.id)}>
                            Trả lời
                        </Btn>
                        <Modal show={feedbackId === feedback.id} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Trả lời ý kiến của sinh viên {feedback.student.maSV}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                        <Form.Label>Nội dung</Form.Label>
                                        <Form.Control as="textarea" rows={3} onChange={handleTraLoiChange} />
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
                                        handleFormSubmit(feedback.id);
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
                            onClick={() => handleShowModalDelete(feedback.id)}
                        >
                            Xóa phản hồi
                        </Btn>
                        <ModalBtn
                            show={deleteFeedbackId === feedback.id}
                            textHeader="Xoá phản hồi?"
                            textBody="Hành động này không thể khôi phục. Bạn chắc chắn muốn xóa phản hồi này?"
                            textFooter="Xác nhận"
                            handleClose={handleCloseModalDelete}
                            handleDelete={() => {
                                setDeleteFeedbackId(null);
                                deleteFeedback(feedback.id);
                            }}
                        />
                    </Col>
                </Row>
            ))}
        </div>
    );
}

export default FeedbackManager;
