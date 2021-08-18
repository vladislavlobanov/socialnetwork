import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { receiveFriendsAndWannabees, unfriend } from "./redux/friends/slice.js";

export default function FriendButton({ idHash, toggleMutualFriends }) {
    const [buttonText, setButtonText] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        let isMounted = true;
        (async () => {
            try {
                const { data } = await axios.get(
                    `/checkFriendStatus/${idHash}`
                );
                if (isMounted) {
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
                    dispatch(receiveFriendsAndWannabees());
                }
            } catch (err) {
                console.log("Err in useEffect friendbtn", err);
            }
        })();

        return () => {
            isMounted = false;
        };
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
                    toggleMutualFriends();
                } else if (buttonText == "End Friendship") {
                    setButtonText("Send Friend Request");
                    toggleMutualFriends();
                }
            })
            .catch((err) => {
                console.log(`error in axios post /checkFriendStatus`, err);
            });
    };

    if (!buttonText) {
        return null;
    }

    return (
        <>
            <button onClick={handleSubmit}>{buttonText}</button>
            {buttonText == "Accept Friend Request" && (
                <button
                    onClick={() =>
                        dispatch(unfriend(idHash)).then(() =>
                            setButtonText("Send Friend Request")
                        )
                    }
                >
                    Reject request
                </button>
            )}
        </>
    );
}
