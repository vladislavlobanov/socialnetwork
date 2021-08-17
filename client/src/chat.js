import { socket } from "./socket.js";
import { useSelector } from "react-redux";

export default function Chat() {
    const messages = useSelector((state) => state.messages);

    if (!messages) {
        return null;
    }

    const handleEnter = (event) => {
        if (event.charCode == 13) {
            event.preventDefault();
            socket.emit("newMessage", event.target.value);
            event.target.value = "";
        }
    };

    return (
        <>
            <div>Chat component</div>

            {messages.map((message, index) => (
                <div className="messageCard" key={index}>
                    <div>{message.text}</div>
                </div>
            ))}

            <textarea onKeyPress={(e) => handleEnter(e)}></textarea>
        </>
    );
}
