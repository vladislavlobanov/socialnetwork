import { Component } from "react";
import { LogoSmall } from "./logo";
import ProfilePic from "./profilepic";
import Uploader from "./uploader";
import Profile from "./profile";
import OtherProfile from "./otherprofile";
import FindPeople from "./findpeople";
import Friends from "./friends";
import { MenuLinks, Hamburger } from "./menulinks";
import Delete from "./delete";
import Chat from "./chat";
import axios from "axios";
import { BrowserRouter, Route, Link } from "react-router-dom";
import MediaQuery from "react-responsive";

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
            deteleIsVisible: false,
            loader: false, //shows loading bar when pic is updating - testing this
            // currentUrl: window.location.pathname,
            linksVisible: false,
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.updateImgMethod = this.updateImgMethod.bind(this);
        this.loaderMethod = this.loaderMethod.bind(this);
        this.updateBioMethod = this.updateBioMethod.bind(this);
        this.toggleLinks = this.toggleLinks.bind(this);
        this.toggleDelete = this.toggleDelete.bind(this);
    }

    async componentDidMount() {
        try {
            this.setState({ loader: true });
            const resp = await axios.get("/user");
            if (resp.data.success) {
                this.setState({
                    first: resp.data.first,
                    last: resp.data.last,
                    imageUrl: resp.data.profileImg,
                    userId: resp.data.userId,
                    bio: resp.data.bio,
                    loader: false,
                });
            } else {
                const res = await axios.get("/api/logout/");
                if (res.status == 200) {
                    location.replace("/");
                }
            }
        } catch (err) {
            console.log("Err in axios get /user: ", err);
        }
    }

    toggleModal() {
        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible,
        });
    }

    toggleDelete() {
        this.setState({
            deteleIsVisible: !this.state.deteleIsVisible,
        });
    }

    toggleLinks() {
        this.setState({
            linksVisible: !this.state.linksVisible,
        });
    }

  
    updateImgMethod(arg) {
        this.setState({
            imageUrl: arg,
        });
     
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
            <BrowserRouter>
                <div className="mainContainerApp">
                    {this.state.userId ? (
                        <>
                            <header>
                                <Link id="logoMain" to={`/`}>
                                    <LogoSmall />
                                </Link>

                                <div className="headerRightSide">
                                    <MenuLinks
                                        toggleStatus={this.state.linksVisible}
                                        toggleMethod={this.toggleLinks}
                                        toggleLinks={this.toggleLinks}
                                    />
                                    <MediaQuery maxWidth={1199}>
                                        <Hamburger
                                            toggleLinks={this.toggleLinks}
                                        />
                                    </MediaQuery>

                                    <div className="profilePicContainer">
                                        <ProfilePic
                                            first={this.state.first}
                                            last={this.state.last}
                                            imageUrl={this.state.imageUrl}
                                            toggleMethod={this.toggleModal}
                                            loaderStatus={this.state.loader}
                                        />
                                    </div>
                                </div>
                            </header>
                            <section className="profileSection">
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
                                        toggleDelete={this.toggleDelete}
                                    />
                                </Route>
                                <Route
                                    path="/user/:id"
                                    render={(props) => (
                                        <OtherProfile
                                            key={props.match.url}
                                            match={props.match}
                                            history={props.history}
                                        />
                                    )}
                                />
                                <Route path="/users" component={FindPeople} />
                                <Route path="/friends" component={Friends} />
                                <Route path="/chat" component={Chat} />
                            </section>
                            {this.state.uploaderIsVisible && (
                                <Uploader
                                    updateImgMethod={this.updateImgMethod}
                                    loaderinApp={this.loaderMethod}
                                    userId={this.state.userId}
                                    toggleMethod={this.toggleModal}
                                />
                            )}
                            {this.state.deteleIsVisible && (
                                <Delete
                                    userId={this.state.userId}
                                    toggleDelete={this.toggleDelete}
                                />
                            )}
                        </>
                    ) : null}
                </div>
            </BrowserRouter>
        );
    }
}
