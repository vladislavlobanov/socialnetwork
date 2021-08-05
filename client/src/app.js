import { Component } from "react";
import Logo from "./logo";
import ProfilePic from "./profilepic";
import Uploader from "./uploader";
import axios from "axios";

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            first: "",
            last: "",
            imageUrl: "",
            userId: "",
            uploaderIsVisible: false,
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.methodInApp = this.methodInApp.bind(this);
    }

    async componentDidMount() {
        try {
            const resp = await axios.get("/user");
            this.setState({
                first: resp.data.first,
                last: resp.data.last,
                imageUrl: resp.data.profileImg,
                userId: resp.data.userId,
            });
        } catch (err) {
            console.log("Err in axios get /user: ", err);
        }
    }

    toggleModal() {
        // console.log("toggleModal in app is running!!!");
        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible,
        });
    }

    // this fn is responsible for receiving your imageUrl from uploader
    // and then storing it to its state
    methodInApp(arg) {
        console.log(
            "methodInApp is running! Argument passed to it is --> ",
            arg
        );
        this.setState({
            imageUrl: arg,
        });
        // make sure you set the imageUrl you received from uploader in state!
    }

    render() {
        return (
            <div>
                <Logo />
                <h1>Hello from App!</h1>

                <ProfilePic
                    first={this.state.first}
                    last={this.state.last}
                    imageUrl={this.state.imageUrl}
                    toggleMethod={this.toggleModal}
                />

                {/* <h2 onClick={() => this.toggleModal()}>
                    Click here to toggle uploader visibility
                </h2> */}

                {this.state.uploaderIsVisible && (
                    <Uploader
                        methodInApp={this.methodInApp}
                        userId={this.state.userId}
                    />
                )}
            </div>
        );
    }
}
