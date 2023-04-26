import moment from 'moment'
import React, { useContext, useEffect, useState } from 'react'
import { Dropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AuthContext } from '../../../App'
import { useApi } from '../../app/api/apiSlice'
import { services } from '../../app/api/services'
import { socket } from '../../pages/app/socket/socket'
import './NotificationMenu.scss'
export const NotificationMenu = () => {

    const { user }: any = useContext(AuthContext);
    const [params, setParams] = useState<any>({ 'where[userId]': user?.id })
    const { data: { data: notifications = [] } = {} } = useApi({ service: services.common.notifications.getAll, params })
    const { resolve, data: newNotification } = useApi({ service: services.common.notifications.update, params })

    const [isConnected, setIsConnected] = useState(socket.connected);
    useEffect(() => {
        if (newNotification?.id)
            setParams({ ...params, r: Math.random() })
    }, [newNotification])
    useEffect(() => {
        function onConnect() {
            socket.timeout(5000).emit('setUserInfo', { ...user, socketId: socket.id }, (sent: any) => {
            });

            setParams({ ...params, r: Math.random() })

            setIsConnected(true);
        }

        function onDisconnect() {
            setIsConnected(false);
        }

        function onNotification(notification: any) {

            toast.warning('receiving notification')
            toast.warning(notification?.text)
            setParams({ ...params, r: Math.random() })
        }
        socket.on('notification', onNotification);
        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);

        return () => {
            socket.off('notification', onNotification);
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
        };
    }, []);

    const onNotificationClick = (notification: any) => {
        resolve({ id:notification?.id, viewed: true })
    }
    const CustomToggle = React.forwardRef(({ children, onClick }: any, ref: any) => (
        <Link
            to={''}
            ref={ref}
            className={`${notifications?.filter(({ viewed }: any) => !viewed).length > 0 ? 'new' : ''}`}
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}
        >
            {children}
        </Link>
    ));

    return (<>
        <ConnectionState isConnected={isConnected} />
        <Dropdown className='az-header-notification' id='NotificationMenu'>
            <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                <i className="fa fa-bell"></i>
            </Dropdown.Toggle>

            <NotificationsContent notifications={notifications} onNotificationClick={onNotificationClick} />

        </Dropdown>
    </>
    );
}

const NotificationsContent = ({ notifications, onNotificationClick }: any) => {
    return <Dropdown.Menu>
        <h6 className="az-notification-title">Notificações</h6>
        <p className="az-notification-text">Tem {notifications.filter(({ viewed }: any) => !viewed).length} novas notificações</p>
        <div className="az-notification-list">
            {notifications?.map((notification: any) =>
                <div className={`media ${notification?.viewed ? '' : 'new'}`} onClick={() => onNotificationClick(notification)}>
                    <div className="az-img-user"><img src="/logo192.png" alt="" /></div>
                    <div className="media-body">
                        <p>{notification.text}</p>
                        <span>{moment(notification.createdAt).fromNow()}</span>
                    </div>
                </div>
            )}
        </div>
    </Dropdown.Menu>
}

const ConnectionState = ({ isConnected }: any) => <i className='fa fa-signal' style={{ color: isConnected ? '#04AA6D' : '#F00' }}></i>
