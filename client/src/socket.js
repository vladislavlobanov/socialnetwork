export let socket;
import { io } from "socket.io-client";
import {
    chatMessagesReceived,
    chatMessageReceived,
} from "./redux/messages/slice.js";
import { allWallPostsReceived, wallPostReceived } from "./redux/wall/slice.js";

export const init = (store) => {
    if (!socket) {
        socket = io.connect();
    }

    socket.on("lastMessages", (data) => {
        store.dispatch(chatMessagesReceived(data));
    });

    socket.on("updateChat", (data) => {
        store.dispatch(chatMessageReceived(data));
    });

    socket.on("allWallPosts", (data) => {
        store.dispatch(allWallPostsReceived(data));
    });
    socket.on("updateWall", (data) => store.dispatch(wallPostReceived(data)));
};
