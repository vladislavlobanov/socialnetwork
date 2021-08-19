import axios from "axios";

export default function Delete({ userId, toggleDelete }) {
    return (
        <div className="modal">
            <div className="modal-close" onClick={() => toggleDelete()} />
            <div className="modalContainer">
                <p onClick={() => toggleDelete()} className="closeButton">
                    &#x2715;
                </p>

                <h2>Would you like to delete your profile?</h2>
                <button
                    onClick={async (e) => {
                        e.preventDefault();
                        const res = await axios.get("/api/delete");

                        if (res.status == 200) {
                            console.log("delete successful!");
                        }
                    }}
                >
                    Yes, please
                </button>
                <button onClick={() => toggleDelete()}>
                    No, I&apos;ve changed my mind
                </button>
            </div>
        </div>
    );
}
