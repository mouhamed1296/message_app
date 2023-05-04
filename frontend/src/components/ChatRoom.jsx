//importation des modules nécessaires à l'utilisation du composant
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

//importation des actions et du custom hook useSocketIo
import { setUsername, setRoom, joinRoom, sendMessage } from '../services/actions';
import useSocketIO from '../hooks/useSocketIo';

/**
 * Composant ChatRoom qui permet d'afficher le chat
 * @returns {JSX.Element}
 */
const ChatRoom = () => {
    const [messageInput, setMessageInput] = useState(''); //le message que l'utilisateur va envoyer dans le chat
    const dispatch = useDispatch(); //dispatch permet de modifier les valeurs du store
    const { username, room, messages } = useSelector((state) => state); //permet de récupérer les valeurs du store
    const { socket, sendMessage: postMessage, listenMessage } = useSocketIO('ws://localhost:3000'); //permet d'envoyer et de recevoir des messages via le socket

    useEffect(() => {
        //rejoindre le salon(room)
        postMessage('joinRoom', room);
        //écouter les messages
        listenMessage('message', (message) => {
            //si le message n'est pas envoyé par l'utilisateur alors on l'ajoute dans le store
            if (message.user !== socket.id) {
                dispatch(sendMessage(room, message.message));
            }
            console.log(message);
            console.log(socket.id);
        });

        /*return () => {
            if (socket) {
                socket.disconnect();
            }
        };*/
    }, [dispatch, room, socket,postMessage, listenMessage]);

    //permet de rejoindre un salon(room)
    const handleJoinRoom = () => {
        console.log(room);
        dispatch(joinRoom(room));
        console.log(room);
        postMessage('joinRoom', room);
    };

    //permet d'envoyer un message dans un salon(room)
    const handleSendMessage = (event) => {
        event.preventDefault();
        if (messageInput.trim() !== '') {
            const message = {
                author: username,
                content: messageInput.trim(),
            };
            postMessage('message', { room: room, message: message });
            dispatch(sendMessage(room, message));
            setMessageInput('');
        }
    };

    return (
        <div>
            <div>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(event) => dispatch(setUsername(event.target.value))}
                />
                <input
                    type="text"
                    placeholder="Room"
                    value={room}
                    onChange={(event) => dispatch(setRoom(event.target.value))}
                />
                <button onClick={handleJoinRoom}>Join Room</button>
            </div>
            <ul>
                {messages.length != 0 && messages.map((message, index) => message ? (
                    <li key={index}>
                        <span>{message.author}: </span>
                        <span>{message.content}</span>
                    </li>
                ): null)
                }
            </ul>
            <form onSubmit={handleSendMessage}>
                <input type="text" value={messageInput} onChange={(event) => setMessageInput(event.target.value)} />
                <button type="submit">Envoyer</button>
            </form>
        </div>
    );
};

export default ChatRoom;
