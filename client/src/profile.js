import BioEditor from "./bioeditor";
import ProfilePic from "./profilepic";
import Wall from "./wall";

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
                    <ProfilePic
                        first={firstProfile}
                        last={lastProfile}
                        imageUrl={imageUrlProfile}
                        toggleMethod={toggleMethodProfile}
                        loaderStatus={loaderStatusProfile}
                    />
                </div>
                <div className="profileAndText right">
                    <h3>
                        {firstProfile} {lastProfile}
                    </h3>

                    <BioEditor
                        bio={bioProfile}
                        userId={userIdProfile}
                        updateBioMethod={updateBioMethodProfile}
                    />
                    <Wall myId={userIdProfile} />
                </div>
            </div>
        </div>
    );
}
