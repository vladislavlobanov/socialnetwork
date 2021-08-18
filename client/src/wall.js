import { socket } from "./socket.js";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Wall({ myId }) {
    const wallposts = useSelector((state) => state.wall);

    if (!wallposts) {
        return null;
    }

    const handleEnter = (event) => {
        if (event.charCode == 13) {
            event.preventDefault();
            socket.emit("updateWall", event.target.value);
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
            <h1 onClick={() => console.log(wallposts)}>Your Wall</h1>
            <div>
                <div className="chatContainer">
                    {wallposts.map((wallposts, index) => (
                        <div className="messageCard" key={index}>
                            <div className="messageCardLeftSide">
                                <img
                                    className="messageCardLeftSide photo"
                                    alt={wallposts.first + " " + wallposts.last}
                                    src={wallposts.img_url || "/user.svg"}
                                />
                            </div>
                            <div className="chatRightSide">
                                <div>
                                    <Link to={`/user/${wallposts.user_id}`}>
                                        {wallposts.first} {wallposts.last}
                                    </Link>{" "}
                                    {dateConverter(wallposts.created_at)}
                                </div>
                                {wallposts.text}
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
