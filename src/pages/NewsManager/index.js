import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './NewsManager.module.scss';

import Button from '~/components/Button';
import * as newsManagerService from '~/services/newsManagerService';
import config from '~/config';
import Success from '~/components/Toast/Toast';
import ModalBtn from '~/components/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Col, Row } from 'react-bootstrap';

const cx = classNames.bind(styles);

function NewsManager() {
    const [news, setNews] = useState([]);
    const [message, setMessage] = useState('');
    const [deleteRoomId, setDeleteRoomId] = useState(null);

    const handleClose = () => setDeleteRoomId(null);
    const handleShow = (roomId) => setDeleteRoomId(roomId);

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        const result = await newsManagerService.getNews();
        setNews(result);
        setTimeout(() => {
            setMessage('');
        }, 3000);
    };

    const deleteRoom = async (id) => {
        try {
            const mess = await newsManagerService.remove(id);
            setMessage(mess);
            fetchNews();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            {!!message && <Success message={message} />}
            <Button
                className={cx('create-news')}
                leftIcon={<FontAwesomeIcon icon={faPlus} />}
                success
                to={config.routes.createNews}
            >
                Thêm thông báo mới
            </Button>
            {news.map((n) => (
                <Row className={cx('card-news', 'flex')} key={n.id}>
                    <Col lg={7} className={cx('flex')}>
                        <img className={cx('image')} src={n.image} alt="" />

                        <div className={cx('content')}>
                            <div>
                                Tiêu đề: <span className={cx('bold')}>{n.tieuDe}</span>
                            </div>
                            <div>
                                Thời gian cập nhật: <span className={cx('bold')}>{n.createdAt}</span>
                            </div>
                        </div>
                    </Col>

                    <Col lg={5} className={cx('flex')}>
                        <Button
                            leftIcon={<FontAwesomeIcon icon={faPenToSquare} />}
                            className={cx('btn-click')}
                            outline
                            to={`/admin/quan-ly-thong-bao/${n.id}/edit`}
                        >
                            Cập nhật thông báo
                        </Button>
                        <Button
                            leftIcon={<FontAwesomeIcon icon={faTrashCan} />}
                            className={cx('btn-click')}
                            primary
                            onClick={() => handleShow(n.id)}
                        >
                            Xóa thông báo
                        </Button>
                    </Col>
                    <ModalBtn
                        show={deleteRoomId === n.id}
                        textHeader="Xoá thông báo?"
                        textBody="Hành động này không thể khôi phục. Bạn chắc chắn muốn xóa thông báo này?"
                        textFooter="Xác nhận"
                        handleClose={handleClose}
                        handleDelete={() => {
                            setDeleteRoomId(null);
                            deleteRoom(n.id);
                        }}
                    />
                </Row>
            ))}
        </div>
    );
}

export default NewsManager;
