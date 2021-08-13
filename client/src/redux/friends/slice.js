import axios from "axios";

export default function friendsReducer(state = null, action) {
    if (action.type == "friendsAndWannabees/receivedFriendsAndWannabees") {
        state = action.payload.friendsAndWannabees;
    }
    if (action.type === "friendsAndWannabees/accepted") {
        state = state.map((friend) => {
            if (friend.id === action.payload.id) {
                return { ...friend, accepted: true };
            }
            return friend;
        });
    }

    if (action.type === "friendsAndWannabees/unfriend") {
        state = state.filter((friend) => {
            return friend.id !== action.payload.id;
        });
    }
    return state;
}

export function receiveFriendsAndWannabees() {
    return async (dispatch) => {
        try {
            const { data: friendsAndWannabees } = await axios.get(
                `/friends-and-wannabees/`
            );
            dispatch({
                type: "friendsAndWannabees/receivedFriendsAndWannabees",
                payload: { friendsAndWannabees },
            });
        } catch (err) {
            console.log(
                "Err in action creator receiveFriendsAndWannabees",
                err
            );
        }
    };
}

export function acceptFriendRequest(id) {
    return async (dispatch) => {
        try {
            await axios.post(`/friendship/accept/`, {
                foreignId: id,
            });
            dispatch({
                type: "friendsAndWannabees/accepted",
                payload: { id },
            });
        } catch (err) {
            console.log("Err in action creator acceptFriendRequest", err);
        }
    };
}

export function unfriend(id) {
    return async (dispatch) => {
        try {
            await axios.post(`/friendship/end/`, {
                foreignId: id,
            });
            dispatch({
                type: "friendsAndWannabees/unfriend",
                payload: { id },
            });
        } catch (err) {
            console.log("Err in action creator unfriend", err);
        }
    };
}
