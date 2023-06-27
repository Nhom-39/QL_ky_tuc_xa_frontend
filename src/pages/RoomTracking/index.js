import { useEffect, useState } from 'react';
import * as studentManagerService from '~/services/studentManagerService';
import classNames from 'classnames/bind';
import styles from './RoomTracking.module.scss';

const cx = classNames.bind(styles);

function RoomTracking() {
    const [student, setStudent] = useState([]);
    useEffect(() => {
        fetchApi();
    }, []);

    const fetchApi = async () => {
        const result = await studentManagerService.getInfoRoom(localStorage.getItem('name'));
        setStudent(result);
    };
    return (
        <div>
            {student.room ? (
                <>
                    {student.room.giaPhong}
                    {student.room.soLuongMax}
                    {student.room.tenPhong}
                    {student.room.thongTin}
                    {student.room.toaNha}
                    {student.room.image}
                </>
            ) : (
                <div>Bạn chưa tham gia phòng nào</div>
            )}
            {student.roomRegister ? (
                <>
                    {student.roomRegister.giaPhong}
                    {student.roomRegister.soLuongMax}
                    {student.roomRegister.tenPhong}
                    {student.roomRegister.thongTin}
                    {student.roomRegister.toaNha}
                    {student.roomRegister.image}
                </>
            ) : (
                <div>Bạn chưa đăng ký phòng nào</div>
            )}
        </div>
    );
}

export default RoomTracking;
