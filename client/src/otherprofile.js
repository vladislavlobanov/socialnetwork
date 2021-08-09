import { Component } from "react";
import axios from "axios";

export default class OtherProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first: "",
            last: "",
            bio: "",
            imgUrl: "",
            id: this.props.match.params.id,
            loader: false,
        };
    }

    async componentDidMount() {
        try {
            this.setState({ loader: true });
            const results = await axios.get("/user/" + this.state.id + ".json");
            this.setState({
                first: results.data.first,
                last: results.data.last,
                bio: results.data.bio,
                imgUrl: results.data.profileImg,
                id: results.data.userId,
                loader: false,
            });
        } catch (err) {
            console.log("Err in axios get /otherprofile: ", err);
        }
    }

    render() {
        return (
            <div className="profileComponent">
                <div className="profileAndText">
                    {this.state.loader ? (
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
                            className="profilePic noCursor"
                            src={this.state.imgUrl || "/user.svg"}
                            alt={this.state.first + " " + this.state.last}
                        />
                    )}
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
