// pass 'props' as an argument to get access to the info being passed down from the parent (App)
// Approach #1 - Using destructuring to pull up the properties inside props
export default function ProfilePic({
    first,
    last,
    imageUrl,
    toggleMethod,
    loaderStatus,
}) {
    // console.log("props - info passed down from parent (App) --> ", props);
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
