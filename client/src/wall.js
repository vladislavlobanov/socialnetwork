import { socket } from "./socket.js";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function Wall({ myId }) {
    const wallposts = useSelector((state) => state.wall);

    useEffect(() => {
        socket.emit("userId", myId);
    }, []);

    if (!wallposts) {
        return null;
    }

    const handleEnter = (event) => {
        if (event.charCode == 13) {
            event.preventDefault();
            socket.emit("newWallPost", {
                text: event.target.value,
                recipient: myId,
            });
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
            <h1 onClick={() => console.log(myId)}>Wall posts</h1>
            <div>
                {!wallposts.length ? (
                    <div>You don&apos;t have any wall posts yet</div>
                ) : (
                    <>
                        <div className="chatContainer">
                            {wallposts.map((wallposts, index) => (
                                <div className="messageCard" key={index}>
                                    <div className="messageCardLeftSide">
                                        <img
                                            className="messageCardLeftSide photo"
                                            alt={
                                                wallposts.first +
                                                " " +
                                                wallposts.last
                                            }
                                            src={
                                                wallposts.img_url || "/user.svg"
                                            }
                                        />
                                    </div>
                                    <div className="chatRightSide">
                                        <div>
                                            <Link
                                                to={`/user/${wallposts.sender_id}`}
                                            >
                                                {wallposts.first}{" "}
                                                {wallposts.last}
                                            </Link>{" "}
                                            {dateConverter(
                                                wallposts.created_at
                                            )}
                                        </div>
                                        {wallposts.text}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
                <textarea
                    placeholder="Leave your message"
                    onKeyPress={(e) => handleEnter(e)}
                ></textarea>
            </div>
        </div>
    );
}
