import { Component } from "react";
import Logo from "./logo";
import ProfilePic from "./profilepic";
import Uploader from "./uploader";
import Profile from "./profile";
import OtherProfile from "./otherprofile";
import axios from "axios";
import { BrowserRouter, Route } from "react-router-dom";

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            first: "",
            last: "",
            imageUrl: "",
            userId: "",
            bio: "",
            uploaderIsVisible: false,
            loader: false, //shows loading bar when pic is updating - testing this
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.updateImgMethod = this.updateImgMethod.bind(this);
        this.loaderMethod = this.loaderMethod.bind(this);
        this.updateBioMethod = this.updateBioMethod.bind(this);
    }

    async componentDidMount() {
        try {
            this.setState({ loader: true });
            const resp = await axios.get("/user");
            this.setState({
                first: resp.data.first,
                last: resp.data.last,
                imageUrl: resp.data.profileImg,
                userId: resp.data.userId,
                bio: resp.data.bio,
                loader: false,
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
    updateImgMethod(arg) {
        this.setState({
            imageUrl: arg,
        });
        // make sure you set the imageUrl you received from uploader in state!
    }

    updateBioMethod(arg) {
        this.setState({
            bio: arg,
        });
    }

    loaderMethod(arg) {
        this.setState({
            loader: arg,
        });
    }

    render() {
        return (
            <div className="mainContainerApp">
                <header>
                    <Logo />
                    <ProfilePic
                        first={this.state.first}
                        last={this.state.last}
                        imageUrl={this.state.imageUrl}
                        toggleMethod={this.toggleModal}
                        loaderStatus={this.state.loader}
                    />
                </header>
                <section className="profileSection">
                    <BrowserRouter>
                        <>
                            <Route exact path="/">
                                <Profile
                                    firstProfile={this.state.first}
                                    lastProfile={this.state.last}
                                    imageUrlProfile={this.state.imageUrl}
                                    bioProfile={this.state.bio}
                                    userIdProfile={this.state.userId}
                                    toggleMethodProfile={this.toggleModal}
                                    loaderStatusProfile={this.state.loader}
                                    updateBioMethodProfile={
                                        this.updateBioMethod
                                    }
                                />
                            </Route>
                            <Route path="/user/:id" component={OtherProfile} />
                        </>
                    </BrowserRouter>
                </section>
                {this.state.uploaderIsVisible && (
                    <Uploader
                        updateImgMethod={this.updateImgMethod}
                        loaderinApp={this.loaderMethod}
                        userId={this.state.userId}
                        toggleMethod={this.toggleModal}
                    />
                )}
            </div>
        );
    }
}
