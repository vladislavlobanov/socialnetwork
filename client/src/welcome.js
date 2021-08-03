import { Registration } from "./registration";
import Logo from "./logo";

export default function Welcome() {
    return (
        <>
            <div className="mainContainer">
                <div className="leftSide">
                    <Logo />
                    <h1>Welcome!</h1>
                    <Registration />
                </div>
                <div className="rightSide"></div>
            </div>
        </>
    );
}
