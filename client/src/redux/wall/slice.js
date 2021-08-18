export default function wallReducer(state = null, action) {
    if (action.type == "wallposts/allreceived") {
        state = action.payload.wallposts;
    }

    if (action.type === "wallposts/newreceived") {
        state = [...action.payload.wallpost, ...state];
    }
    return state;
}

export function allWallPostsReceived(wallposts) {
    return {
        type: "wallposts/allreceived",
        payload: { wallposts },
    };
}

export function wallPostReceived(wallpost) {
    return {
        type: "wallposts/newreceived",
        payload: { wallpost },
    };
}
