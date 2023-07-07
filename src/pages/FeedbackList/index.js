import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import classNames from 'classnames/bind';

import styles from './FeedbackList.module.scss';

import Btn from '~/components/Button/Button';
import ModalBtn from '~/components/Modal';
import * as feedbackService from '~/services/feedbackService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { Col, Row } from 'react-bootstrap';
import Toast from '~/components/Toast/Toast';

const cx = classNames.bind(styles);

function FeedbackList() {
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState('');

    const [tieuDe, setTieuDe] = useState('');
    const [noiDung, setNoiDung] = useState('');
    const [feedbacks, setFeedBacks] = useState([]);
    const [error, setError] = useState('');

    const [errorValue1, setErrorValue1] = useState(false);
    const [errorValue2, setErrorValue2] = useState(false);

    const [deleteFeedbackId, setDeleteFeedbackId] = useState(null);

    const handleShowModalDelete = (feedbackId) => setDeleteFeedbackId(feedbackId);

    const handleTieuDeChange = (e) => {
        setTieuDe(e.target.value);
    };

    const handleNoiDungChange = (e) => {
        setNoiDung(e.target.value);
    };

    const handleClose = () => {
        setShow(false);
    };
    const handleShow = () => setShow(true);
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const data = {
            tieuDe: tieuDe,
            noiDung: noiDung,
        };

        if (tieuDe !== '' && noiDung !== '') {
            try {
                await feedbackService.postCreateReport(localStorage.getItem('name'), data);
            } catch (error) {
                console.error(error);
            }
            setMessage('Gửi báo cáo đến quản trị viên thành công');
            setError(false);
            setShow(false);
            setTieuDe('');
            setNoiDung('');
        } else {
            if (tieuDe === '') {
                setErrorValue1(true);
            } else setErrorValue1(false);
            if (noiDung === '') {
                setErrorValue2(true);
            } else setErrorValue2(false);
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
        const result = await feedbackService.getFeedbackByUser(localStorage.getItem('name'));
        setFeedBacks(result);
    };

    const deleteFeedback = async (id) => {
        try {
            const mess = await feedbackService.remove(id);
            setMessage(mess);
            setTimeout(() => {
                setMessage('');
            }, 3000);
            fetchApi();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={cx('wrapper')}>
            {!!message && !error && <Toast message={message} success />}
            {!!message && error && <Toast message={message} error />}
            <div>
                <Btn onClick={handleShow} success className={cx('m-bottom')}>
                    Thêm báo cáo mới
                </Btn>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Gửi báo cáo đến quản trị viên</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Tiêu đề</Form.Label>
                                <Form.Control
                                    className={errorValue1 ? cx('error-input') : ''}
                                    type="text"
                                    value={tieuDe}
                                    onChange={handleTieuDeChange}
                                    autoFocus
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Nội dung</Form.Label>
                                <Form.Control
                                    className={errorValue2 ? cx('error-input') : ''}
                                    as="textarea"
                                    rows={3}
                                    value={noiDung}
                                    onChange={handleNoiDungChange}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleFormSubmit}>
                            Gửi
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
            <Row className={cx('title', 'items-center')}>
                <Col lg={1}>STT</Col>
                <Col lg={3}>Tiêu đề</Col>
                <Col lg={3}>Nội dung</Col>
                <Col lg={2}>Trả lời</Col>
            </Row>
            {feedbacks.map((feedback, i) => (
                <Row className={cx('items-center', 'items')} key={feedback.id}>
                    <Col lg={1} className={cx('m-left')}>
                        <span>{i + 1}</span>
                    </Col>
                    <Col lg={3}>
                        <span className={cx('m-left')}>{feedback.tieuDe}</span>
                    </Col>
                    <Col lg={3}>
                        <span className={cx('m-left')}>{feedback.noiDung}</span>
                    </Col>
                    <Col lg={3}>
                        <span className={cx('m-left')}>{feedback.traLoi}</span>
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
                            handleClose={() => setDeleteFeedbackId(null)}
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

export default FeedbackList;
