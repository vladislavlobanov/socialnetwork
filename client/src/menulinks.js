import { Link } from "react-router-dom";
import axios from "axios";
import { useMediaQuery } from "react-responsive";

export function MenuLinks({ toggleStatus, toggleMethod }) {
    const handleMediaQueryChange = (matches) => {
        if (!matches && toggleStatus) {
            toggleMethod();
        }
    };
    const hideMenu = useMediaQuery(
        { maxWidth: 1066 },
        undefined,
        handleMediaQueryChange
    );

    const showMenu = useMediaQuery({ query: "(min-width: 1066px)" });

    const menuHtml = (
        <div className="linksMenu">
            <Link to="/users">Find people</Link>
            <Link to="/friends">Friends</Link>
            <Link
                to={``}
                onClick={async (e) => {
                    e.preventDefault();
                    const res = await axios.get("api/logout/");

                    if (res.status == 200) {
                        location.replace("/");
                    }
                }}
            >
                Log out
            </Link>
        </div>
    );
    return (
        <>
            {showMenu && menuHtml}
            {hideMenu && toggleStatus && menuHtml}
        </>
    );
}

export function Hamburger({ toggleLinks }) {
    return (
        <div
            className="hamburgerMenu"
            onClick={() => {
                toggleLinks();
            }}
        >
            <svg viewBox="0 0 100 80" width="40" height="40">
                <rect width="100" height="20" rx="5" ry="5"></rect>
                <rect y="30" width="100" height="20" rx="5" ry="5"></rect>
                <rect y="60" width="100" height="20" rx="5" ry="5"></rect>
            </svg>
        </div>
    );
}
