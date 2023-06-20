import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import images from '~/assets/images';
import Button from '~/components/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(styles);
function Home() {
    return (
        <div className={cx('wrapper')}>
            <Carousel>
                <Carousel.Item>
                    <img className="d-block w-100" src={images.ktx1} alt="" />
                    <Carousel.Caption>
                        <h2>KÝ TÚC XÁ DHBKHN</h2>
                        <p>Nơi tình yêu bắt đầu</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img className="d-block w-100" src={images.ktx2} alt="" />

                    <Carousel.Caption>
                        <h2>KÝ TÚC XÁ DHBKHN</h2>
                        <p>Không gian sống xanh</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img className="d-block w-100" src={images.ktx3} alt="" />

                    <Carousel.Caption>
                        <h2>KÝ TÚC XÁ DHBKHN</h2>
                        <p>An ninh tốt - Vệ sinh tốt</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
            <div className={cx('notification')}>
                <h2 className={cx('title')}>THÔNG BÁO</h2>
                <Container>
                    <Row>
                        <Col xs={12} xl={4} md={4} className={cx('div-card')}>
                            <Card className={cx('card-item')}>
                                <Card.Img
                                    variant="top"
                                    src="http://ktx.hust.edu.vn/wp-content/uploads/2022/09/huongdank67-400x280.jpg"
                                />
                                <Card.Body>
                                    <Card.Title>
                                        Thông báo xếp ở nội trú cho sinh viên K67 kỳ I năm học 2022-2023
                                    </Card.Title>
                                    <p>
                                        <FontAwesomeIcon icon={faCalendar} />
                                        Thang 9, 2022
                                    </p>
                                    <Card.Text className={cx('content')}>
                                        Căn cứ kế hoạch nămhọc 2022-2023. Trung tâm QL KTX xin trân trọng thông báo
                                        thông tin xếp ở kỳ I/2022-2023 cho sinh viên K67 như sau: Nhà xếp ở: B6, B9, B10
                                        Thời gian mở đăng ký ...
                                    </Card.Text>
                                    <Button primary small>
                                        Đọc thêm
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xs={12} xl={4} md={4} className={cx('div-card')}>
                            <Card className={cx('card-item')}>
                                <Card.Img
                                    variant="top"
                                    src="http://ktx.hust.edu.vn/wp-content/uploads/2022/09/huongdank67-400x280.jpg"
                                />
                                <Card.Body>
                                    <Card.Title>
                                        Thông báo xếp ở nội trú cho sinh viên K67 kỳ I năm học 2022-2023
                                    </Card.Title>
                                    <p>
                                        <FontAwesomeIcon icon={faCalendar} />
                                        Thang 9, 2022
                                    </p>
                                    <Card.Text className={cx('content')}>
                                        Căn cứ kế hoạch nămhọc 2022-2023. Trung tâm QL KTX xin trân trọng thông báo
                                        thông tin xếp ở kỳ I/2022-2023 cho sinh viên K67 như sau: Nhà xếp ở: B6, B9, B10
                                        Thời gian mở đăng ký ...
                                    </Card.Text>
                                    <Button primary small>
                                        Đọc thêm
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xs={12} xl={4} md={4} className={cx('div-card')}>
                            <Card className={cx('card-item')}>
                                <Card.Img
                                    variant="top"
                                    src="http://ktx.hust.edu.vn/wp-content/uploads/2022/09/huongdank67-400x280.jpg"
                                />
                                <Card.Body>
                                    <Card.Title>
                                        Thông báo xếp ở nội trú cho sinh viên K67 kỳ I năm học 2022-2023
                                    </Card.Title>
                                    <p>
                                        <FontAwesomeIcon icon={faCalendar} /> Thang 9, 2022
                                    </p>
                                    <Card.Text className={cx('content')}>
                                        Căn cứ kế hoạch nămhọc 2022-2023. Trung tâm QL KTX xin trân trọng thông báo
                                        thông tin xếp ở kỳ I/2022-2023 cho sinh viên K67 như sau: Nhà xếp ở: B6, B9, B10
                                        Thời gian mở đăng ký ...
                                    </Card.Text>
                                    <Button primary small>
                                        Đọc thêm
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>

            <div className={cx('about')}>
                <Row>
                    <Col xl={6}>
                        <h3 className={cx('title-about')}>TT QUẢN LÝ KTX</h3>
                        <p className={cx('content-about')}>
                            Tổ chức, quản lý toàn diện khu KTX sinh viên. Bố trí xếp ở sinh viên nội trú đúng đối tượng,
                            số lượng, đảm bảo thu lệ phí lưu trú của sinh viên nộp về trường đúng qui định; Đảm bảo đủ
                            các điều kiện phục vụ sinh hoạt và học tập của sinh viên nội trú: Điện, nước sinh hoạt, dịch
                            vụ ăn uống. An ninh trật tự, vệ sinh môi trường Hoạt động thể thao và văn hoá tinh thần
                            trong khu KTX.
                        </p>
                    </Col>
                    <Col xl={6}>
                        <img className={cx('img-about')} src={images.ktxFooter} alt="" />
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default Home;
