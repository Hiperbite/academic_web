import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react'
const __chatBotIcon__ = "https://img.icons8.com/external-beshi-glyph-kerismaker/48/external-Bot-costumer-service-beshi-glyph-kerismaker.png"
const __commonIcon__ = "https://img.icons8.com/color/48/000000/circled-user-female-skin-type-7.png"

export const MessagesReceived = ({ socket, username }: any) => {
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
      style={{ minHeight: "50vh" }}
    >
      {messagesRecieved.map((msg: any, i: number) => (
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

