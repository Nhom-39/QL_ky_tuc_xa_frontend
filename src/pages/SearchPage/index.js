import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { useLocation } from 'react-router-dom';
import * as searchServices from '~/services/searchService';
import Button from '~/components/Button/Button';
import styles from './SearchPage.module.scss';

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
        <div>
            {searchResult.map((result) => (
                <Button
                    className={cx('btn-room')}
                    key={result.id}
                    // onClick={() => handleRoomClick(result.id, result.tenPhong, result.toaNha, result.soLuong)}
                >
                    <div className={cx('wrapper', 'flex')}>
                        <p className={cx('content')}>Phòng: {result.tenPhong}</p>
                        <p className={cx('content')}>Thuộc tòa nhà: {result.toaNha}</p>
                    </div>
                </Button>
            ))}
        </div>
    );
}

export default SearchPage;
