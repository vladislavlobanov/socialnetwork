import ReactDOM from "react-dom";
import Welcome from "./welcome";
import axios from "axios";
import Logo from "./logo";

axios.get("/user/id.json").then(function ({ data }) {
    if (!data.userId) {
        ReactDOM.render(<Welcome />, document.querySelector("main"));
    } else {
        // user registered/is logged in therefore the user
        // should NOT see Welcome -> Registration, BUT instead see our logo
        ReactDOM.render(<Logo />, document.querySelector("main"));
    }
});
