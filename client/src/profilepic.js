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

// // Approach #2 - Using object notation
// export default function ProfilePic(props) {
//     // console.log("props - info passed down from parent (App) --> ", props);
//     return (
//         <div>
//             <h2>
//                 This is a presentational component! Im in charge of rendering
//                 something!
//             </h2>
//             <h3>
//                 Hi my name is {props.first} {props.last} and Im {props.age}{" "}
//                 years old!
//             </h3>
//             <img
//                 className="profile-pic"
//                 src={props.imageUrl}
//                 alt="Layla Arias"
//             />
//         </div>
//     );
// }
