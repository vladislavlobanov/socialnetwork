import { combineReducers } from "redux";
import friendsReducer from "./friends/slice.js";
import messagesReducer from "./messages/slice.js";
import wallReducer from "./wall/slice.js";

const rootReducer = combineReducers({
    friendsAndWannabees: friendsReducer,
    messages: messagesReducer,
    wall: wallReducer,
});

export default rootReducer;
