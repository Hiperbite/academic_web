import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { Badge, Col, ListGroup, Row } from 'react-bootstrap';
import { io } from 'socket.io-client';
import storage from '../../../app/storage';
import { MessagesReceived } from './components/MessagesReceived';
import { RoomAndUsersColumn } from './components/RoomAndUsersColumn';
import { SendMessage } from './components/SendMessage';


import './scss/Chat.scss'

const Room = ({ username, room, socket, enterRoom, setUsername }: any) => {
    return (
        <div id="Chat">
            <h1>Chat</h1>
            <h4>{room}</h4>
            {
            room ?
                <div className=''>
                    <div className="row">
                        <div className="col-3">
                                <RoomAndUsersColumn
                                    socket={socket}
                                    username={username}
                                    room={room}
                                    enterRoom={enterRoom}
                                />
                        </div>

                        <div className="col-9 px-0">
                            <MessagesReceived socket={socket}  username={username} room={room} />
                            <SendMessage socket={socket} username={username} room={room} />

                        </div>
                    </div>
                </div> : <Home username={username} setUsername={setUsername} room={room} socket={socket} enterRoom={enterRoom} />}</div>)


};

const Home = ({ username, setUsername, room: r, enterRoom, socket }: any) => {
    const [rooms, setRooms] = useState([])
    // Runs whenever a socket event is recieved from the server
    useEffect(() => {
        socket.on("chat_rooms", (data: any) => {

            setRooms(data)
            console.log(data);
        })


        // Remove event listener on component unmount
        return () => socket.off("receive_message");

    }, [socket]);


    return (
        <div className={""}>
            
            <Row>
                <Col md={4}>
                    <ListGroup as="ol" numbered>
                        {rooms?.map(({ room, __createdtime__, user }: any) =>
                            <ListGroup.Item
                                as="li"
                                className="d-flex justify-content-between align-items-start hover"
                                onClick={() => enterRoom(room)}
                            >
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold"><img src="https://img.icons8.com/color/48/000000/circled-user-female-skin-type-7.png" width="30" height="30" />{room}</div>
                                    <small className=' small text-muted text-sm-end'>{moment(__createdtime__).fromNow()}</small>
                                </div>
                                <Badge bg="primary" pill>
                                    {' '}
                                </Badge>
                            </ListGroup.Item>
                        )}
                    </ListGroup>
                </Col>
            </Row>
        </div>
    );
};

const socket = io('http://localhost:7200');


export const Chat = ({ mini = false }: { mini: boolean }) => {

    const user = storage.get('user');
    const [username, setUsername] = useState(user?.person?.fullName);
    const [room, enterRoom] = useState(username);

    useEffect(() => {
        if (room) {
            debugger
            socket.emit('join_room', { username, room, user })
        }

    }, [room]);

    return <Room setUsername={setUsername} username={username} room={room} socket={socket} enterRoom={enterRoom} />
}