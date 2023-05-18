import React, { useEffect, useState } from 'react'
import { Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export const RoomAndUsersColumn = ({ socket, username, room, enterRoom }:any) => {
    const [roomUsers, setRoomUsers] = useState([]);
    const [rooms, setRooms] = useState([]);
  
    const navigate = useNavigate();
  
    useEffect(() => {
      socket.on("chatroom_users", (data:any) => {
        debugger
        setRoomUsers(data);
        setRooms(data);
      });
  
      return () => socket.off("chatroom_users");
    }, [socket]);
  
    const leaveRoom = () => {
      const __createdtime__ = Date.now();
      socket.emit("leave_room", { username, room, __createdtime__ });
      enterRoom(null)
    };
  
    return (
      <>
          <div className="col col-md-6">
            <button className="btn btn-sm btn-outline " onClick={leaveRoom}>
              <i className='fa fa-chevron-left'></i> {' '}Sair
            </button>
          </div>
  
          <div className="list-group rounded-0">
            {roomUsers.map((user:any) => (
              <a className={"list-group-item list-group-item-action " + (user?.username === username ? "gradiant-primary text-white" : "") +"  rounded-0"} onClick={()=>enterRoom(user?.username)}>
                <div className="media">
                  <img
                    src="https://bootstrapious.com/i/snippets/sn-chat/avatar.svg"
                    alt="user"
                    width="50"
                    className="rounded-circle"
                    key={user?.id}
                  />
                  <div className="media-body ml-4">
                    <div className="d-flex align-items-center justify-content-between mb-1">
                      <h6
                        className="mb-0"
                        style={{
                          fontWeight: `${
                            user?.username === username ? "bold" : "normal"
                          }`,
                        }}
                      >
                        {user.username}
                      </h6>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
      </>
    );
  };
  