import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';

import styles from './StudentItem.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper';

const cx = classNames.bind(styles);

function StudentItem({ children, data }) {
    const renderPreview = (props) => {
        return (
            <div tabIndex="-1" {...props}>
                <PopperWrapper>
                    <div className={cx('wrapper')}>
                        <p className={cx('header')}>Thông tin sinh viên</p>
                        <p>Họ tên: {data[0]}</p>
                        <p>Mã SV: {data[1]}</p>
                        <p>Giới tính: {data[2]}</p>
                        <p>Ngày sinh: {data[3]}</p>
                        <p>Email: {data[4]}</p>
                        <p>Số điện thoại: {data[5]}</p>
                        <div>
                            {data[6] !== null && (
                                <div>
                                    Đang ở tại phòng: &nbsp;{data[6].tenPhong}&nbsp; - &nbsp; {data[6].toaNha}
                                </div>
                            )}
                            {data[6] === null && <div>Chưa có phòng</div>}
                        </div>
                    </div>
                </PopperWrapper>
            </div>
        );
    };

    return (
        <Tippy interactive delay={[0, 0]} offset={[70, 0]} placement="bottom-start" render={renderPreview}>
            {children}
        </Tippy>
    );
}

export default StudentItem;
