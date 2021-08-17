export let socket;
import { io } from "socket.io-client";
import { chatMessagesReceived } from "./redux/messages/slice.js";

export const init = (store) => {
    if (!socket) {
        socket = io.connect();
    }

    socket.on("lastMessages", (data) =>
        store.dispatch(chatMessagesReceived(data))
    );
};
