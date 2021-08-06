import { Component } from "react";
import axios from "axios";

export default class BioEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editorIsVisible: false,
            draftBio: "",
            buttonText: "Close",
            isDisabled: false, //Disabled upload button while await for DB query to finish
        };
        this.textareaToggle = this.textareaToggle.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    async textareaToggle(e) {
        e.preventDefault();
        if (this.state.buttonText == "Update") {
            this.setState({
                isDisabled: true,
            });
            try {
                await this.functionToUpdateDatabaseWithNewBio();
                this.setState({
                    editorIsVisible: !this.state.editorIsVisible,
                    buttonText: "Close",
                    isDisabled: false,
                });
            } catch (err) {
                console.log("Err in updating bio in handleChange: ", err);
            }
        } else {
            this.setState({
                editorIsVisible: !this.state.editorIsVisible,
                buttonText: "Close",
                isDisabled: false,
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
                BIO EDITOR
                {this.props.bio ? (
                    <>
                        <p>{this.props.bio}</p>
                        {!this.state.editorIsVisible ? (
                            <a onClick={this.textareaToggle} href="">
                                Edit
                            </a>
                        ) : (
                            <>
                                <textarea
                                    defaultValue={this.props.bio}
                                    onChange={this.handleChange}
                                />
                                <button
                                    onClick={this.textareaToggle}
                                    disabled={this.state.isDisabled}
                                >
                                    {!this.state.editorIsVisible
                                        ? "Close"
                                        : this.state.buttonText}
                                </button>
                            </>
                        )}
                    </>
                ) : (
                    <>
                        {!this.state.editorIsVisible ? (
                            <a onClick={this.textareaToggle} href="">
                                Add your bio now
                            </a>
                        ) : (
                            <>
                                <textarea onChange={this.handleChange} />
                                <button
                                    disabled={this.state.isDisabled}
                                    onClick={this.textareaToggle}
                                >
                                    {!this.state.editorIsVisible
                                        ? "Close"
                                        : this.state.buttonText}
                                </button>
                            </>
                        )}
                    </>
                )}
            </div>
        );
    }
}
