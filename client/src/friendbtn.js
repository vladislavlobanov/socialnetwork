import { useState, useEffect } from "react";
import axios from "axios";

export default function FriendButton({ idHash }) {
    const [buttonText, setButtonText] = useState("");

    useEffect(() => {
        (async () => {
            const { data } = await axios.get(`/checkFriendStatus/${idHash}`);
            console.log(data);
            if (data.length == 0) {
                setButtonText("Send Friend Request");
            } else if (data[0].accepted == true) {
                setButtonText("End Friendship");
            } else {
                if (data[0].recipient_id == data[0].userId) {
                    setButtonText("Accept Friend Request");
                } else {
                    setButtonText("Cancel Friend Request");
                }
            }
        })();
    }, []);

    const handleSubmit = () => {
        axios
            .post("/checkFriendStatus/", {
                buttonText: buttonText,
                foreignId: idHash,
            })
            .then(() => {
                if (buttonText == "Send Friend Request") {
                    setButtonText("Cancel Friend Request");
                } else if (buttonText == "Cancel Friend Request") {
                    setButtonText("Send Friend Request");
                } else if (buttonText == "Accept Friend Request") {
                    setButtonText("End Friendship");
                } else if (buttonText == "End Friendship") {
                    setButtonText("Send Friend Request");
                }
            })
            .catch((err) => {
                console.log(`error in axios post /checkFriendStatus`, err);
            });
    };

    return <button onClick={handleSubmit}>{buttonText}</button>;
}
