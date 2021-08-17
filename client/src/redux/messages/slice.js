export default function friendsReducer(state = null, action) {
    if (action.type == "messages/allreceived") {
        state = action.payload.messages;
    }
    return state;
}

export function chatMessagesReceived(messages) {
    return {
        type: "messages/allreceived",
        payload: { messages },
    };
}
