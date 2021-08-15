import { Component } from "react";
import axios from "axios";
import FriendButton from "./friendbtn";

export default class OtherProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first: "",
            last: "",
            bio: "",
            imgUrl: "",
            id: this.props.match.params.id,
        };
    }

    async componentDidMount() {
        try {
            const results = await axios.get("/user/" + this.state.id + ".json");
            if (results.data.success) {
                this.setState({
                    first: results.data.first,
                    last: results.data.last,
                    bio: results.data.bio,
                    imgUrl: results.data.profileImg,
                    id: results.data.userId,
                });
            } else {
                this.props.history.replace("/");
            }
        } catch (err) {
            console.log("Err in axios get /otherprofile: ", err);
        }
    }

    render() {
        if (!this.state.first) {
            return null;
        }
        return (
            <div className="profileComponent">
                <div className="profileAndText">
                    <div className="imgAndFriendButton">
                        <img
                            className="profilePic noCursor"
                            src={this.state.imgUrl || "/user.svg"}
                            alt={this.state.first + " " + this.state.last}
                            onError={(e) => {
                                e.target.src = "/user.svg";
                            }}
                        />

                        <FriendButton idHash={this.state.id} />
                    </div>
                    <div className="profileAndText right">
                        <h3>
                            {this.state.first} {this.state.last}
                        </h3>
                        {this.state.bio ? (
                            <a>{this.state.bio}</a>
                        ) : (
                            <a>User doesn&apos;t have any bio yet</a>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}
