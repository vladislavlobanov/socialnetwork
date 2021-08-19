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
    toggleDelete,
}) {
    return (
        <div className="profileComponent">
            <div className="profileAndText">
                <div className="imgAndFriendButton">
                    <div className="profilePicContainerBig">
                        <ProfilePic
                            first={firstProfile}
                            last={lastProfile}
                            imageUrl={imageUrlProfile}
                            toggleMethod={toggleMethodProfile}
                            loaderStatus={loaderStatusProfile}
                        />
                    </div>
                    <button
                        className="buttonStyle small"
                        onClick={() => {
                            toggleDelete();
                        }}
                    >
                        Delete profile
                    </button>
                </div>
                <div className="profileAndText right">
                    <h1>
                        {firstProfile} {lastProfile}
                    </h1>

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
