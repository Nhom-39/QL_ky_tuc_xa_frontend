import PropTypes from 'prop-types';
import { faCheckCircle, faExclamationCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import classNames from 'classnames/bind';

import styles from './Toast.module.scss';

const cx = classNames.bind(styles);

function Toast({ message, error = false, success = false }) {
    return (
        <div className={cx('message', { error, success })}>
            {success && (
                <>
                    <div className={cx('toast-icon')}>
                        <FontAwesomeIcon icon={faCheckCircle} />
                    </div>
                    <div className={cx('toast-body')}>
                        <h3>Thành công!</h3>
                        <p>{message}</p>
                    </div>
                </>
            )}
            {error && (
                <>
                    <div className={cx('toast-icon')}>
                        <FontAwesomeIcon icon={faExclamationCircle} />
                    </div>
                    <div className={cx('toast-body')}>
                        <h3>Thất bại!</h3>
                        <p>{message}</p>
                    </div>
                </>
            )}
            <div className={cx('toast-close')}>
                <FontAwesomeIcon icon={faTimes} />
            </div>
        </div>
    );
}

Toast.propTypes = {
    message: PropTypes.string,
};

export default Toast;
