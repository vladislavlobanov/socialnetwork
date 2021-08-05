import { HashRouter, Route } from "react-router-dom";

import { Registration } from "./registration";
import { Login } from "./login";
import { ResetPassword } from "./resetpassword";
import Logo from "./logo";

export default function Welcome() {
    return (
        <>
            <div className="mainContainer">
                <div className="leftSide">
                    <Logo />
                    <HashRouter>
                        <div>
                            <Route exact path="/" component={Registration} />
                            <Route path="/login" component={Login} />
                            <Route
                                path="/password-reset"
                                component={ResetPassword}
                            />
                        </div>
                    </HashRouter>
                </div>
                <div className="rightSide"></div>
            </div>
        </>
    );
}
