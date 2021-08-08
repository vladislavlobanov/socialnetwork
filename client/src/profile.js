import BioEditor from "./bioeditor";
import ProfilePic from "./profilepic";

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
                <ProfilePic
                    first={firstProfile}
                    last={lastProfile}
                    imageUrl={imageUrlProfile}
                    toggleMethod={toggleMethodProfile}
                    loaderStatus={loaderStatusProfile}
                />
                <div className="profileAndText right">
                    <h3>
                        {firstProfile} {lastProfile}
                    </h3>
                    <BioEditor
                        bio={bioProfile}
                        userId={userIdProfile}
                        updateBioMethod={updateBioMethodProfile}
                    />
                </div>
            </div>
        </div>
    );
}
