import { useEffect, useState } from 'react';
import * as newsService from '~/services/newsService';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './NewsItem.module.scss';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { Col, Row } from 'react-bootstrap';

const cx = classNames.bind(styles);
function NewsItem() {
    const [news, setNews] = useState([]);
    const { id } = useParams();
    useEffect(() => {
        fetchNews();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);
    const fetchNews = async () => {
        const result = await newsService.getNewsInfo(id);
        setNews(result);
    };

    return (
        <>
            <div className={cx('banner')}>
                <div className={cx('title')}>{news.tieuDe}</div>
            </div>
            <Row className={cx('margin')}>
                <Col lg={2}></Col>
                <Col lg={4}>
                    <div className={cx('calender')}>
                        <FontAwesomeIcon icon={faCalendar} />
                        {news.createdAt}
                    </div>
                    <p>[{news.tieuDe}]</p>
                </Col>
            </Row>
            <Row>
                <Col lg={2}></Col>
                <Col lg={4}>
                    <img className={cx('image')} src={news.image} alt="" />
                </Col>
                <Col lg={1}></Col>
                <Col lg={3}>
                    <div className={cx('content')}>{news.noiDung}</div>
                </Col>
                <Col lg={2}></Col>
            </Row>
        </>
    );
}

export default NewsItem;
