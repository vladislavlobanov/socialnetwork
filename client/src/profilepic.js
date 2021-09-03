export default function ProfilePic({
    first,
    last,
    imageUrl,
    toggleMethod,
    loaderStatus,
}) {
    imageUrl = imageUrl || "/user.svg";
    return (
        <>
            {loaderStatus ? (
                <div className="loaderContainer">
                    <div className="lds-spinner">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            ) : (
                <img
                    className="profilePic"
                    src={imageUrl}
                    alt={first + " " + last}
                    onClick={() => toggleMethod()}
                />
            )}
        </>
    );
}
