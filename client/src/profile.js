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
            <h1>USER PROFILE COMPONENT</h1>
            <h3>
                Hello my name is {firstProfile} {lastProfile}
            </h3>

            <ProfilePic
                first={firstProfile}
                last={lastProfile}
                imageUrl={imageUrlProfile}
                toggleMethod={toggleMethodProfile}
                loaderStatus={loaderStatusProfile}
            />
            <BioEditor
                bio={bioProfile}
                userId={userIdProfile}
                updateBioMethod={updateBioMethodProfile}
            />
        </div>
    );
}
