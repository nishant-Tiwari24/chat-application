import React, {useState, useEffect} from 'react'
import queryString from 'query-string';
import io from 'socket.io-client'

const Chat = () => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const ENDP = 'localhost:3000'
    const socket = io(ENDP)

    useEffect(() => {
        const { name, room } = queryString.parse(location.search);
        setName(name);
        setRoom(room);

        console.log(room,name)
        socket.emit('join', {name, room})
    },[ENDP,location.search])

    useEffect(() => {
        socket.on('message', (message) => {
            setMessage([...messages,message])
        })
        console.log(message)
    },[messages])

    const handleSubmit = (e) => {
      e.preventDefault();

      const messageData = {
        mess : message,
        username : name,
        ro : room,
        time: new Date()
      };
      socket.emit('sendMessage', messageData)
    }

    
  return (
    <div>
      chat
      <input value={message.text} onChange={(e) => setMessage(e.target.value)}/>
      <button onClick={handleSubmit}>send</button>
    </div>
  )
}

export default Chat
