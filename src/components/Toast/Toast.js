import PropTypes from 'prop-types';
import { useState } from 'react';
import classNames from 'classnames/bind';
import { faCheckCircle, faExclamationCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './Toast.module.scss';

const cx = classNames.bind(styles);

function Toast({ message, error = false, success = false }) {
    const [show, setShow] = useState(true);
    const handleClickClose = () => {
        setShow(false);
    };
    return (
        <div>
            {success && show && (
                <div className={cx('message', { error, success })}>
                    <div className={cx('toast-icon')}>
                        <FontAwesomeIcon icon={faCheckCircle} />
                    </div>
                    <div className={cx('toast-body')}>
                        <h3>Thành công!</h3>
                        <p>{message}</p>
                    </div>
                    <div className={cx('toast-close')} onClick={handleClickClose}>
                        <FontAwesomeIcon icon={faTimes} />
                    </div>
                </div>
            )}
            {error && show && (
                <div className={cx('message', { error, success })}>
                    <div className={cx('toast-icon')}>
                        <FontAwesomeIcon icon={faExclamationCircle} />
                    </div>
                    <div className={cx('toast-body')}>
                        <h3>Thất bại!</h3>
                        <p>{message}</p>
                    </div>
                    <div className={cx('toast-close')} onClick={handleClickClose}>
                        <FontAwesomeIcon icon={faTimes} />
                    </div>
                </div>
            )}
        </div>
    );
}

Toast.propTypes = {
    message: PropTypes.string,
};

export default Toast;
