export default function friendsReducer(state = null, action) {
    if (action.type == "messages/allreceived") {
        state = action.payload.messages;
    }

    if (action.type === "messages/newreceived") {
        state = [...action.payload.message, ...state];
    }
    return state;
}

export function chatMessagesReceived(messages) {
    return {
        type: "messages/allreceived",
        payload: { messages },
    };
}

export function chatMessageReceived(message) {
    return {
        type: "messages/newreceived",
        payload: { message },
    };
}
