import { useEffect, useState } from 'react';
import * as newsService from '~/services/newsService';
import classNames from 'classnames/bind';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from '~/components/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import styles from './NewsList.module.scss';

const cx = classNames.bind(styles);
function NewsList() {
    const [news, setNews] = useState([]);
    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        const result = await newsService.getNews();
        setNews(result);
    };
    console.log(news);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('notification')}>
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
                                        <p className={cx('calendar')}>
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
        </div>
    );
}

export default NewsList;
