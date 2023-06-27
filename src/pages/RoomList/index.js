import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import * as roomManagerService from '~/services/roomManagerService';

import styles from './RoomList.module.scss';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function RoomList() {
    const [rooms, setRooms] = useState([]);
    useEffect(() => {
        fetchRooms();
    }, []);

    const fetchRooms = async () => {
        const result = await roomManagerService.getRoom();
        setRooms(result);
    };
    return (
        <div className={cx('wrapper')}>
            <Container>
                <Row>
                    {rooms.map((room) => (
                        <Col xs={12} xl={3} md={4} className={cx('div-card')} key={room.id}>
                            <Link to={`/danh-sach-phong/${room.id}`}>
                                <Card className={cx('card-item')}>
                                    <Card.Img className={cx('image')} variant="top" src={room.image} />
                                    <Card.Body className={cx('body')}>
                                        <Card.Title className={cx('title')}>
                                            <p>
                                                Phòng {room.tenPhong} {room.toaNha} số lượng {room.soLuongMax} sinh viên
                                            </p>
                                        </Card.Title>
                                        <Card.Text className={cx('content')}>{room.giaPhong}Đ / Tháng</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Link>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
}

export default RoomList;
