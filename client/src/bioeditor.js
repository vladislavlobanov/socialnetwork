import { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class BioEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editorIsVisible: false,
            draftBio: "",
            buttonText: "Close",
            showBio: true,
        };
        this.textareaToggle = this.textareaToggle.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    async textareaToggle(e) {
        e.preventDefault();

        if (this.state.buttonText == "Update") {
            try {
                await this.functionToUpdateDatabaseWithNewBio();
                this.setState({
                    editorIsVisible: !this.state.editorIsVisible,
                    showBio: !this.state.showBio,
                    buttonText: "Close",
                });
            } catch (err) {
                console.log("Err in updating bio in handleChange: ", err);
            }
        } else {
            this.setState({
                editorIsVisible: !this.state.editorIsVisible,
                showBio: !this.state.showBio,
                buttonText: "Close",
            });
        }
    }

    handleChange({ target }) {
        // updating state!

        this.setState({
            draftBio: target.value,
            buttonText: "Update",
        });
    }

    async functionToUpdateDatabaseWithNewBio() {
        try {
            const results = await axios.post("/updatebio", {
                id: this.props.userId,
                bio: this.state.draftBio,
            });
            this.props.updateBioMethod(results.data.bio);
        } catch (err) {
            console.log("Err in axios post /updatebio: ", err);
        }

        // Here you will want to make a post request to the server.
        // You will update the value of the bio in the DB with the new one.
        // Once successful, you can call a function passed down from App
        // to update the value in App
    }

    render() {
        return (
            <div>
                {this.props.bio ? (
                    <>
                        <div className="bioContainer leftAlign">
                            {this.state.showBio && <>{this.props.bio}</>}

                            {!this.state.editorIsVisible ? (
                                <button
                                    className="buttonStyle small"
                                    onClick={this.textareaToggle}
                                    to={``}
                                >
                                    {" "}
                                    Edit bio
                                </button>
                            ) : (
                                <div className="bioContainer centerAlign">
                                    <textarea
                                        className="bioTextArea"
                                        defaultValue={this.props.bio}
                                        onChange={this.handleChange}
                                    />
                                    <button
                                        className="buttonStyle small"
                                        onClick={this.textareaToggle}
                                    >
                                        {!this.state.editorIsVisible
                                            ? "Close"
                                            : this.state.buttonText}
                                    </button>
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <>
                        {!this.state.editorIsVisible ? (
                            <button
                                className="buttonStyle small"
                                onClick={this.textareaToggle}
                                to={``}
                            >
                                Add your bio now
                            </button>
                        ) : (
                            <div className="bioContainer">
                                <textarea
                                    className="bioTextArea"
                                    onChange={this.handleChange}
                                />
                                <button
                                    className="buttonStyle small"
                                    onClick={this.textareaToggle}
                                >
                                    {!this.state.editorIsVisible
                                        ? "Close"
                                        : this.state.buttonText}
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        );
    }
}
