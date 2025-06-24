import { io } from "socket.io-client";
import { BASE_URL, BASE_URL1 } from "./constants";

export const createSocketConnection = ()=>{
    return io (BASE_URL1, {
    transports: ["websocket"],
    withCredentials: true,
  });
};