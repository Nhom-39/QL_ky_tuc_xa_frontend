import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { useLocation } from 'react-router-dom';
import * as searchServices from '~/services/searchService';
import styles from './SearchPage.module.scss';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function SearchPage() {
    const location = useLocation();

    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const q = params.get('q');
        setSearchValue(q);
    }, [location.search]);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await searchServices.search(searchValue);
            setSearchResult(result);
        };

        fetchApi();
    }, [searchValue]);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('banner')}>Có {searchResult.length} kết quả thỏa mãn</div>
            <Container>
                <Row>
                    {searchResult.map((room) => (
                        <Col key={room.id} xs={12} xl={3} md={4} className={cx('div-card')}>
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

export default SearchPage;
