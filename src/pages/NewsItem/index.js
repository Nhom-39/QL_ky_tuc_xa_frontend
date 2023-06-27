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
            <div>
                <div className={cx('calender')}>
                    <FontAwesomeIcon icon={faCalendar} />
                    {news.createdAt}
                </div>
                <p>[{news.tieuDe}]</p>
            </div>
            <Row>
                <Col lg={6}>
                    <img className={cx('image')} src={news.image} alt="" />
                </Col>
                <Col lg={6}>
                    <div className={cx('content')}>{news.noiDung}</div>
                </Col>
            </Row>
        </>
    );
}

export default NewsItem;
