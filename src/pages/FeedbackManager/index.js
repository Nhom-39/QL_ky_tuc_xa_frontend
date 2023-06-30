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

const cx = classNames.bind(styles);
function FeedbackManager() {
    const [show, setShow] = useState(false);
    const [traLoi, setTraLoi] = useState('');
    const [feedbacks, setFeedBacks] = useState([]);

    const [deleteFeedbackId, setDeleteFeedbackId] = useState(null);

    const handleCloseModalDelete = () => setDeleteFeedbackId(null);
    const handleShowModalDelete = (feedbackId) => setDeleteFeedbackId(feedbackId);
    // const [error, setError] = useState('');

    const handleTraLoiChange = (e) => {
        setTraLoi(e.target.value);
    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
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
        <>
            {feedbacks.map((feedback) => (
                <div className={cx('', 'flex')} key={feedback.id}>
                    <div className={cx('content')}>
                        <div>
                            Tên phòng: <span className={cx('bold')}>{feedback.tieuDe}</span>
                        </div>
                        <div>
                            Tòa nhà: <span className={cx('bold')}>{feedback.noiDung}</span>
                        </div>
                        <div>
                            Số lượng tối đa sinh viên: <span className={cx('bold')}>{feedback.traLoi}</span>
                        </div>
                    </div>

                    <Btn onClick={handleShow}>Trả lời ý kiến</Btn>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Gửi báo cáo đến quản trị viên</Modal.Title>
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
                            <Button variant="primary" onClick={() => handleFormSubmit(feedback.id)}>
                                Gửi
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    <Btn
                        leftIcon={<FontAwesomeIcon icon={faTrashCan} />}
                        className={cx('btn-click')}
                        primary
                        onClick={() => handleShowModalDelete(feedback.id)}
                    >
                        Xóa phòng
                    </Btn>
                    <ModalBtn
                        show={deleteFeedbackId === feedback.id}
                        textHeader="Xoá phản hồi?"
                        textBody="Hành động này không thể khôi phục. Bạn chắc chắn muốn xóa phản hồi này?"
                        textFooter="Xác nhận"
                        handleClose={handleClose}
                        handleDelete={() => {
                            setDeleteFeedbackId(null);
                            deleteFeedback(feedback.id);
                        }}
                    />
                </div>
            ))}
        </>
    );
}

export default FeedbackManager;
