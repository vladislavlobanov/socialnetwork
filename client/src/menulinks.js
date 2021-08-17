import { Link } from "react-router-dom";
import axios from "axios";
import { useMediaQuery } from "react-responsive";

export function MenuLinks({ toggleStatus, toggleMethod, toggleLinks }) {
    const handleMediaQueryChange = (matches) => {
        if (!matches && toggleStatus) {
            toggleMethod();
        }
    };
    const hideMenu = useMediaQuery(
        { maxWidth: 1200 },
        undefined,
        handleMediaQueryChange
    );

    const showMenu = useMediaQuery({ query: "(min-width: 1200px)" });

    const menuHtml = (
        <>
            <Link
                onClick={() => {
                    if (!showMenu) toggleLinks();
                }}
                to="/chat"
            >
                Chat
            </Link>
            <Link
                onClick={() => {
                    if (!showMenu) toggleLinks();
                }}
                to="/users"
            >
                Find people
            </Link>
            <Link
                onClick={() => {
                    if (!showMenu) toggleLinks();
                }}
                to="/friends"
            >
                Friends
            </Link>
            <Link
                to={``}
                onClick={async (e) => {
                    e.preventDefault();
                    const res = await axios.get("api/logout/");

                    if (res.status == 200) {
                        toggleLinks();
                        location.replace("/");
                    }
                }}
            >
                Log out
            </Link>
        </>
    );
    return (
        <>
            {showMenu && <div className="linksMenu">{menuHtml}</div>}

            {hideMenu && toggleStatus && (
                <>
                    <div
                        onClick={() => toggleLinks()}
                        className="overlayMenu"
                    ></div>
                    <div className="linksMenu">
                        <p
                            onClick={() => toggleLinks()}
                            className="closeButton"
                        >
                            &#x2715;
                        </p>
                        {menuHtml}
                    </div>
                </>
            )}
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

// const menuHtml = (
//         <div className="linksMenu">
//             <p className="closeButton">X</p>
//             <Link to="/chat">Chat</Link>
//             <Link to="/users">Find people</Link>
//             <Link to="/friends">Friends</Link>
//             <Link
//                 to={``}
//                 onClick={async (e) => {
//                     e.preventDefault();
//                     const res = await axios.get("api/logout/");

//                     if (res.status == 200) {
//                         location.replace("/");
//                     }
//                 }}
//             >
//                 Log out
//             </Link>
//         </div>
//     );
//     return (
//         <>
//             {showMenu && menuHtml}

//             {hideMenu && toggleStatus && menuHtml}
//         </>
//     );
// }
