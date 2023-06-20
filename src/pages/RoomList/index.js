import classNames from 'classnames/bind';
import styles from './RoomList.module.scss';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const cx = classNames.bind(styles);

function RoomList() {
    return (
        <div className={cx('wrapper')}>
            <Container>
                <Row>
                    <Col xs={12} xl={3} md={4} className={cx('div-card')}>
                        <Card className={cx('card-item')}>
                            <Card.Img
                                variant="top"
                                src="https://ktx.vnuhcm.edu.vn/thumb/500x500/1/phongo/phong82.jpg"
                            />
                            <Card.Body className={cx('body')}>
                                <Card.Title className={cx('title')}>
                                    <p>Phòng 8 sinh viên B1304 vf gfg fg</p>
                                </Card.Title>
                                <Card.Text className={cx('content')}>160000Đ / Tháng</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} xl={3} md={4} className={cx('div-card')}>
                        <Card className={cx('card-item')}>
                            <Card.Img
                                variant="top"
                                src="https://ktx.vnuhcm.edu.vn/thumb/500x500/1/phongo/phong82.jpg"
                            />
                            <Card.Body className={cx('body')}>
                                <Card.Title className={cx('title')}>
                                    <p>Phòng 8 sinh viên</p>
                                </Card.Title>
                                <Card.Text className={cx('content')}>160000Đ / Tháng</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} xl={3} md={4} className={cx('div-card')}>
                        <Card className={cx('card-item')}>
                            <Card.Img
                                variant="top"
                                src="https://ktx.vnuhcm.edu.vn/thumb/500x500/1/phongo/phong82.jpg"
                            />
                            <Card.Body className={cx('body')}>
                                <Card.Title className={cx('title')}>
                                    <p>Phòng 8 sinh viên</p>
                                </Card.Title>
                                <Card.Text className={cx('content')}>160000Đ / Tháng</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} xl={3} md={4} className={cx('div-card')}>
                        <Card className={cx('card-item')}>
                            <Card.Img
                                variant="top"
                                src="https://ktx.vnuhcm.edu.vn/thumb/500x500/1/phongo/phong82.jpg"
                            />
                            <Card.Body className={cx('body')}>
                                <Card.Title className={cx('title')}>
                                    <p>Phòng 8 sinh viên</p>
                                </Card.Title>
                                <Card.Text className={cx('content')}>160000Đ / Tháng</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} xl={3} md={4} className={cx('div-card')}>
                        <Card className={cx('card-item')}>
                            <Card.Img
                                variant="top"
                                src="https://ktx.vnuhcm.edu.vn/thumb/500x500/1/phongo/phong82.jpg"
                            />
                            <Card.Body className={cx('body')}>
                                <Card.Title className={cx('title')}>
                                    <p>Phòng 8 sinh viên</p>
                                </Card.Title>
                                <Card.Text className={cx('content')}>160000Đ / Tháng</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} xl={3} md={4} className={cx('div-card')}>
                        <Card className={cx('card-item')}>
                            <Card.Img
                                variant="top"
                                src="https://ktx.vnuhcm.edu.vn/thumb/500x500/1/phongo/phong82.jpg"
                            />
                            <Card.Body className={cx('body')}>
                                <Card.Title className={cx('title')}>
                                    <p>Phòng 8 sinh viên</p>
                                </Card.Title>
                                <Card.Text className={cx('content')}>160000Đ / Tháng</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default RoomList;
