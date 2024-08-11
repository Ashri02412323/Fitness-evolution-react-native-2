import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const SOCKET_URL = 'https://evolution-erm4.onrender.com'; // Replace with your server URL

const SocketComponent = () => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(SOCKET_URL, {
      transports: ['websocket'], // Use WebSocket transport
      jsonp: false,
      query: {
        param1: 'value1',
        param2: 'value2'
      }
    });

    setSocket(newSocket);

    return () => newSocket.close(); // Cleanup on unmount
  }, []);

  return (
    <div>
      <h1>Socket Component</h1>
      {/* Add more UI elements as needed */}
    </div>
  );
};

export default SocketComponent;