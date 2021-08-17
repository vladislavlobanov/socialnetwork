import { combineReducers } from "redux";
import friendsReducer from "./friends/slice.js";
import messagesReducer from "./messages/slice.js";

const rootReducer = combineReducers({
    friendsAndWannabees: friendsReducer,
    messages: messagesReducer,
});

export default rootReducer;
