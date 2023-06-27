import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import { Col, Row } from 'react-bootstrap';

import * as roomManagerService from '~/services/roomManagerService';
import styles from './RoomItem.module.scss';
import Button from '~/components/Button/Button';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as studentManagerService from '~/services/studentManagerService';
import Toast from '~/components/Toast/Toast';

const cx = classNames.bind(styles);

function RoomItem() {
    const { id } = useParams();

    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await roomManagerService.getRoomInfo(id);
            setRoom(result);
        };

        fetchApi();
    }, [id]);
    const handleRegisterRoomSubmit = async (masv, roomId) => {
        if (masv === null) {
            setMessage('Bạn cần phải đăng nhập mới có thể đăng ký phòng');
            setError(true);
        } else {
            try {
                const result = await studentManagerService.registerRoom(masv, roomId);
                console.log(result);
                if (result) {
                    setMessage('Đăng ký phòng thành công');
                    setError(false);
                } else {
                    setMessage('Phòng đã đầy');
                    setError(true);
                }
            } catch (error) {
                console.log(error);
            }
        }
        setTimeout(() => {
            setMessage('');
        }, 3000);
    };
    return (
        <>
            {!!message && !error && <Toast message={message} success />}
            {!!message && error && <Toast message={message} error />}
            <div className={cx('banner')}>
                <div className={cx('title')}>
                    Phòng: {room.tenPhong} - Tòa: {room.toaNha}
                </div>
            </div>
            <Row>
                <Col lg={6}>
                    <img className={cx('image')} src={room.image} alt="" />
                </Col>
                <Col lg={6}>
                    <div className={cx('content')}>
                        <div>
                            Tên phòng: <span className={cx('bold', 'name-room')}>{room.tenPhong}</span>
                        </div>
                        <div>
                            Thuộc tòa nhà: <span className={cx('bold')}>{room.toaNha}</span>
                        </div>
                        <div>
                            Số lượng tối đa sinh viên: <span className={cx('bold')}>{room.soLuongMax}</span>
                        </div>
                        <div>
                            Thông tin phòng: <span className={cx('bold')}>{room.thongTin}</span>
                        </div>
                        <div>
                            Giá Phòng: <span className={cx('bold')}>{room.giaPhong}</span> Đ/Tháng
                        </div>
                        <Button outline onClick={() => handleRegisterRoomSubmit(localStorage.getItem('name'), room.id)}>
                            <FontAwesomeIcon icon={faSignInAlt} />
                            <span>Đăng ký phòng</span>
                        </Button>
                    </div>
                </Col>
            </Row>
        </>
    );
}

export default RoomItem;
