import { useState, useEffect } from 'react';
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
import * as newsService from '~/services/newsService';

const cx = classNames.bind(styles);
function Home() {
    const [news, setNews] = useState([]);
    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        const result = await newsService.getTop3News();
        setNews(result);
    };
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
                        {news.map((n) => (
                            <Col xs={12} xl={4} md={4} className={cx('div-card')} key={n.id}>
                                <Card className={cx('card-item')}>
                                    <Button to={`/thong-bao/${n.id}`}>
                                        <Card.Img
                                            variant="top"
                                            src="http://ktx.hust.edu.vn/wp-content/uploads/2022/09/huongdank67-400x280.jpg"
                                        />
                                    </Button>
                                    <Card.Body>
                                        <Button to={`/thong-bao/${n.id}`}>
                                            <p className={cx('title-news')}>{n.tieuDe}</p>
                                        </Button>
                                        <p className={cx('calender')}>
                                            <FontAwesomeIcon icon={faCalendar} />
                                            {n.createdAt}
                                        </p>
                                        <Card.Text className={cx('content')}>{n.noiDung}</Card.Text>
                                        <Button primary small to={`/thong-bao/${n.id}`}>
                                            Đọc thêm
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
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
