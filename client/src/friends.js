import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    receiveFriendsAndWannabees,
    acceptFriendRequest,
    unfriend,
} from "./redux/friends/slice.js";
import { Link } from "react-router-dom";

export default function Friends() {
    const dispatch = useDispatch();

    const wannabees = useSelector(
        (state) =>
            state.friendsAndWannabees &&
            state.friendsAndWannabees.filter(
                (wannabee) => wannabee.accepted == false
            )
    );

    const friends = useSelector(
        (state) =>
            state.friendsAndWannabees &&
            state.friendsAndWannabees.filter(
                (friend) => friend.accepted == true
            )
    );

    useEffect(() => {
        dispatch(receiveFriendsAndWannabees());
    }, []);

    if (!friends || !wannabees) {
        return null;
    }

    const wannaBeHtml = (
        <div className="FriendWannaBeContainer">
            {wannabees.map((wannabee) => (
                <div className="friendCard" key={wannabee.id}>
                    <img
                        className="friendPhoto"
                        src={wannabee.img_url || "/user.svg"}
                        alt={wannabee.first + " " + wannabee.last}
                        onError={(e) => {
                            e.target.src = "/user.svg";
                        }}
                    />
                    <div className="friendCardRightSide">
                        <Link to={`/user/${wannabee.id}`}>
                            <p>
                                {wannabee.first} {wannabee.last}
                            </p>
                        </Link>

                        <button
                            onClick={() =>
                                dispatch(acceptFriendRequest(wannabee.id))
                            }
                        >
                            Accept request
                        </button>
                        <button onClick={() => dispatch(unfriend(wannabee.id))}>
                            Reject request
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );

    const friendsHtml = (
        <div className="FriendWannaBeContainer">
            {friends.map((friend) => (
                <div className="friendCard" key={friend.id}>
                    <img
                        className="friendPhoto"
                        src={friend.img_url || "/user.svg"}
                        alt={friend.first + " " + friend.last}
                        onError={(e) => {
                            e.target.src = "/user.svg";
                        }}
                    />
                    <div className="friendCardRightSide">
                        <Link to={`/user/${friend.id}`}>
                            <p>
                                {friend.first} {friend.last}
                            </p>
                        </Link>

                        <button onClick={() => dispatch(unfriend(friend.id))}>
                            End friendship
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div className="friendsWannaBeesContainer">
            <h1>These people want to be your friends</h1>
            {!wannabees.length && (
                <div>Nobody has sent you a friend request</div>
            )}
            {!!wannabees.length && wannaBeHtml}

            <h1>These people are currently your friends</h1>
            {!friends.length && (
                <div>Currently, you don&apos;t have any friends</div>
            )}
            {!!friends.length && friendsHtml}
        </div>
    );
}
