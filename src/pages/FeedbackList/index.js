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

const cx = classNames.bind(styles);

function FeedbackList() {
    const [show, setShow] = useState(false);
    const [tieuDe, setTieuDe] = useState('');
    const [noiDung, setNoiDung] = useState('');
    const [feedbacks, setFeedBacks] = useState([]);

    const [deleteFeedbackId, setDeleteFeedbackId] = useState(null);

    const handleCloseModalDelete = () => setDeleteFeedbackId(null);
    const handleShowModalDelete = (feedbackId) => setDeleteFeedbackId(feedbackId);
    // const [error, setError] = useState('');

    const handleTieuDeChange = (e) => {
        setTieuDe(e.target.value);
    };

    const handleNoiDungChange = (e) => {
        setNoiDung(e.target.value);
    };

    const handleClose = () => setShow(false);
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
        const result = await feedbackService.getFeedbackByUser(localStorage.getItem('name'));
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
            <div>
                <Btn onClick={handleShow}>Thêm báo cáo mới</Btn>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Gửi báo cáo đến quản trị viên</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Tiêu đề</Form.Label>
                                <Form.Control type="text" value={tieuDe} onChange={handleTieuDeChange} autoFocus />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Nội dung</Form.Label>
                                <Form.Control as="textarea" rows={3} value={noiDung} onChange={handleNoiDungChange} />
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

                    {/* <Button
                        leftIcon={<FontAwesomeIcon icon={faPenToSquare} />}
                        className={cx('btn-click')}
                        outline
                        to={`/admin/quan-ly-phong/${room.id}/edit`}
                    >
                        Thay đổi thông tin phòng
                    </Button> */}
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

export default FeedbackList;
