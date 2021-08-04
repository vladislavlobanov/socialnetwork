import { HashRouter, Route } from "react-router-dom";
import { Registration } from "./registration";
import { Login } from "./login";
import Logo from "./logo";

export default function Welcome() {
    return (
        <>
            <div className="mainContainer">
                <div className="leftSide">
                    <Logo />
                    <h1>Welcome!</h1>
                    <HashRouter>
                        <div>
                            <Route exact path="/" component={Registration} />
                            <Route path="/login" component={Login} />
                        </div>
                    </HashRouter>
                </div>
                <div className="rightSide"></div>
            </div>
        </>
    );
}
