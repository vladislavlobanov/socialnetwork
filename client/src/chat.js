import { socket } from "./socket.js";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

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

    const dateConverter = (dateToConvert) => {
        let d = new Date(dateToConvert);
        var options = {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            hour12: false,
        };
        d = new Intl.DateTimeFormat("en-US", options).format(d).toString();
        return d;
    };

    return (
        <div className="chatComponent">
            <h1>Chat component</h1>
            <div>
                <div className="chatContainer">
                    {messages.map((message, index) => (
                        <div className="messageCard" key={index}>
                            <div className="messageCardLeftSide">
                                <img
                                    className="messageCardLeftSide photo"
                                    alt={message.first + " " + message.last}
                                    src={message.img_url || "/user.svg"}
                                />
                            </div>
                            <div className="chatRightSide">
                                <div>
                                    <Link to={`/user/${message.user_id}`}>
                                        {message.first} {message.last}
                                    </Link>{" "}
                                    {dateConverter(message.created_at)}
                                </div>
                                {message.text}
                            </div>
                        </div>
                    ))}
                </div>
                <textarea
                    placeholder="Say hi!"
                    onKeyPress={(e) => handleEnter(e)}
                ></textarea>
            </div>
        </div>
    );
}
