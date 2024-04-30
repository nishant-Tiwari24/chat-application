import React, {useState, useEffect} from 'react'
import queryString from 'query-string';
import io from 'socket.io-client'

const Chat = () => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const ENDP = 'localhost:3000'
    let socket;

    useEffect(() => {
        const { name, room } = queryString.parse(location.search);
        socket = io(ENDP,{
            withCredentials: true,
            extraHeaders: {
              "my-custom-header": "abcd"
    }})
        setName(name);
        setRoom(room);
        console.log(socket)
        socket.emit('join', {name, room})
    },[ENDP,location.search])

    useEffect(() => {
        socket.on('message', (message) => {
            setMessage([...messages,message])

        })
    },[messages])

    const sendMessage = (e) => {
        e.preventDefault();
        if(message) {
            socket.emit('sendMessage', message, () => setMessage(''))
        }
    }
    
  return (
    <div>
      chat
      <input value={message} onChange={(e) => setMessage(e.target.value)} onKeyPress={e => e.key === 'Enter' ? sendMessage(e) : null}/>
    </div>
  )
}

export default Chat
