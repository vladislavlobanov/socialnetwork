import BioEditor from "./bioeditor";
import ProfilePic from "./profilepic";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Profile({
    firstProfile,
    lastProfile,
    imageUrlProfile,
    bioProfile,
    userIdProfile,
    toggleMethodProfile,
    loaderStatusProfile,
    updateBioMethodProfile,
}) {
    return (
        <div className="profileComponent">
            <div className="profileAndText">
                <div className="profilePicContainerBig">
                    {imageUrlProfile ? (
                        <ProfilePic
                            first={firstProfile}
                            last={lastProfile}
                            imageUrl={imageUrlProfile}
                            toggleMethod={toggleMethodProfile}
                            loaderStatus={loaderStatusProfile}
                        />
                    ) : null}
                </div>
                <div className="profileAndText right">
                    <h3>
                        {firstProfile} {lastProfile}
                    </h3>
                    {bioProfile ? (
                        <BioEditor
                            bio={bioProfile}
                            userId={userIdProfile}
                            updateBioMethod={updateBioMethodProfile}
                        />
                    ) : null}
                    <Link
                        to={`/`}
                        onClick={async () => {
                            const res = await axios.get("/logout/");

                            if (res.status == 200) {
                                window.location.href = "/";
                            }
                        }}
                    >
                        Log out
                    </Link>
                </div>
            </div>
        </div>
    );
}
