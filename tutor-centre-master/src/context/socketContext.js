import React, { createContext, useState, useEffect, useContext } from "react";
import io from "socket.io-client";
import { LOCAL_HOST, SOCKET_PORT } from "@env";

const SocketContext = createContext();

const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = io(`${LOCAL_HOST}:${SOCKET_PORT}`);
        setSocket(newSocket);

        return () => newSocket.close();
    }, []);

    return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};

const useSocket = () => {
    const socket = useContext(SocketContext);
    return socket;
};

export { SocketProvider, useSocket };
