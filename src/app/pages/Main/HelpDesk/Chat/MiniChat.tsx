import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client';
import storage from '../../../app/storage';
import './scss/MiniChat.scss'

const socket = io('http://localhost:7200');

const __createdtime__ = Date.now();
const __chatBotIcon__ = "https://img.icons8.com/external-beshi-glyph-kerismaker/48/external-Bot-costumer-service-beshi-glyph-kerismaker.png"
const __commonIcon__ = "https://img.icons8.com/color/48/000000/circled-user-female-skin-type-7.png"

export const MiniChat = () => {

    const user = storage.get('user');
    const username = user?.person?.fullName;
    const [room, enterRoom] = useState(username);
    const [chating, setChating] = useState(false)
    const [chatWith, setChatWith] = useState<any>()
    const [loading, setloading] = useState(false)
    useEffect(() => {
        if (chating) {
            socket.emit('join_room', { username, room, user })
        }
        else {
            socket.emit("leave_room", { username, room, __createdtime__ });

        }

    }, [room, chating]);


    return (
        <div id={"MiniChat"}>
            <div className="card mt-5" >
                <div className="d-flex flex-row justify-content-between p-3 adiv text-white gradiant-primary">
                    <i className="typcn typcn-message"></i>
                    <span className="pb-3">Live chat with : {chatWith}</span>
                    <i className="fa fa-minus" onClick={() => setChating(!chating)}></i>
                </div>
                {chating ? <>

                    <MessagesReceived socket={socket} username={username} setChatWith={setChatWith} />

                    <SendMessage socket={socket} username={username} room={room} />

                </> : null}
            </div>
        </div>
    )
}




export const MessagesReceived = ({ socket, username, setChatWith }: any) => {
    const [messagesRecieved, setMessagesReceived] = useState<any[]>([]);

    const messagesColumnRef: any = useRef(null); // Add this

    // Runs whenever a socket event is recieved from the server
    useEffect(() => {
        socket.on("receive_message", (data: any) => {
            console.log(data);
            setMessagesReceived((state: any) => [
                ...state,
                {
                    message: data.message,
                    username: data.username,
                    __createdtime__: data.__createdtime__,
                },
            ]);

            if (data?.username === 'ChatBot' && data?.user?.username !== username) {
                setChatWith(data?.user?.username)
            }
        });

        // Remove event listener on component unmount
        return () => socket.off("receive_message");
    }, [socket]);

    // Add this
    useEffect(() => {
        // Last 100 messages sent in the chat room (fetched from the db in backend)
        socket.on("last_100_messages", (last100Messages: any) => {
            console.log("Last 100 messages:", JSON.parse(last100Messages));
            last100Messages = JSON.parse(last100Messages);
            // Sort these messages by __createdtime__
            last100Messages = sortMessagesByDate(last100Messages);
            setMessagesReceived((state) => [...last100Messages, ...state]);
        });

        return () => socket.off("last_100_messages");
    }, [socket]);

    // Add this
    // Scroll to the most recent message
    useEffect(() => {
        messagesColumnRef.current.scrollTop =
            messagesColumnRef?.current?.scrollHeight;
    }, [messagesRecieved]);

    // Add this
    function sortMessagesByDate(messages: any) {
        return messages.sort(
            (a: any, b: any) => parseInt(a.__createdtime__) - parseInt(b.__createdtime__)
        );
    }


    return (
        <div
            className="px-4 py-5 chat-box bg-white"
            ref={messagesColumnRef}
        >
            {messagesRecieved.map((msg, i) => (
                <>
                    <div className={(msg?.username === username ? "text-right mine flex-row-reverse" : "flex-row") + " d-flex  p-1"} key={i}>
                        {msg?.username === username ? null :

                            // eslint-disable-next-line jsx-a11y/alt-text
                            <img
                                src={msg?.username === 'ChatBot' ? __chatBotIcon__ : __commonIcon__}
                                width="30"
                                height="30"
                            />}
                        <div className="chat ml-2 p-2 pull-right">
                            {msg.message}
                        </div>
                    </div>
                    <p className={(msg?.username === username ? "text-right" : "") + " small text-muted"} >
                        {moment(msg.__createdtime__).fromNow()}
                    </p>

                </>
            ))}
        </div>
    );
};

const SendMessage = ({ socket, username, room }: any) => {
    const [message, setMessage] = useState("");

    const sendMessage = () => {
        debugger
        if (message !== "") {
            const __createdtime__ = Date.now();
            // Send message to server. We can't specify who we send the message to from the frontend. We can only send to server. Server can then send message to rest of users in room
            socket.emit("send_message", { username, room, message, __createdtime__ });
            setMessage("");
        }
    };
    const handleKeyPress = (event: any) => {
        if (event.key === "Enter") {
            sendMessage();
        }
    };

    return (
        <>
            <div className="bg-light">
                <div className="input-group">
                    <input
                        onKeyUp={handleKeyPress}
                        type="text"
                        placeholder="Type a message"
                        aria-describedby="button-addon2"
                        className="form-control rounded-0 border-0 py-4 bg-light"
                        onChange={(e) => setMessage(e.target.value)}
                        value={message}
                    />
                    <div className="input-group-append">
                        <button
                            id="button-addon2"
                            type="button"
                            className="btn btn-link"
                            onClick={sendMessage}
                        >
                            {" "}
                            <i className="fa fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

/***
 * 
 * 
 *
 * 
 * 




                    <div className="d-flex flex-row p-3">
                        <img
                            src="https://img.icons8.com/color/48/000000/circled-user-female-skin-type-7.png"
                            width="30"
                            height="30"
                        />
                        <div className="chat ml-2 p-3">
                            Hello and thankyou for visiting birdlymind. Please click the video
                            above
                        </div>
                    </div>

                    <div className="d-flex flex-row p-3">
                        <div className="bg-white mr-2 p-3">
                            <span className="text-muted">
                                Hello and thankyou for visiting birdlynind.
                            </span>
                        </div>
                        <img
                            src="https://img.icons8.com/color/48/000000/circled-user-male-skin-type-7.png"
                            width="30"
                            height="30"
                        />
                    </div>

                    <div className="d-flex flex-row p-3">
                        <img
                            src="https://img.icons8.com/color/48/000000/circled-user-female-skin-type-7.png"
                            width="30"
                            height="30"
                        />
                        <div className="myvideo ml-2">
                            <img src="https://imgur.com/GOxU1jx.png" width="200" />
                        </div>
                    </div>

                    <div className="d-flex flex-row p-3">
                        <img
                            src="https://img.icons8.com/color/48/000000/circled-user-female-skin-type-7.png"
                            width="30"
                            height="30"
                        />
                        <div className="chat ml-2 p-3">
                            <span className="text-muted dot">. . .</span>
                        </div>
                    </div>


 */