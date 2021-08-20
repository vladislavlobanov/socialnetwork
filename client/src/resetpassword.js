import { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export class ResetPassword extends Component {
    constructor() {
        super();
        this.state = {
            error: false,
            errMessage: "",
            view: 1,
        };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange({ target }) {
        console.log("which input is running handleChange?", target.name);
        console.log("value the user typed:", target.value);
        // updating state!
        this.setState(
            {
                [target.name]: target.value,
            },
            console.log("this.state in ResetPwd:", this.state)
        );
    }
    handleSubmit(e) {
        e.preventDefault(); // prevents button from triggering a refresh
        console.log("user clicked ResetPwd");
        // when the btn gets clicked we want to make an axios request sending
        // over our value of state
        console.log("this.state in ResetPwd", this.state);

        if (this.state.view == 1) {
            axios
                .post("/api/password/reset/start", this.state)
                .then((resp) => {
                    if (resp.data.success) {
                        this.setState({
                            view: this.state.view + 1,
                            error: false,
                            errMessage: "",
                        });
                    } else {
                        this.setState({
                            error: true,
                            errMessage: resp.data.errMessage,
                        });
                    }
                })
                .catch((err) => {
                    console.log(
                        "something went wrong in POST /password/reset/start",
                        err
                    );
                    this.setState({
                        error: true,
                        errMessage: "Something went wrong",
                    });
                });
        }

        if (this.state.view == 2) {
            axios
                .post("/api/password/reset/verify", this.state)
                .then((resp) => {
                    if (resp.data.success) {
                        this.setState({
                            view: this.state.view + 1,
                            error: false,
                            errMessage: "",
                        });
                    } else {
                        this.setState({
                            error: true,
                            errMessage: resp.data.errMessage,
                        });
                    }
                })
                .catch((err) => {
                    console.log(
                        "something went wrong in POST /password/reset/verify",
                        err
                    );
                    this.setState({
                        error: true,
                        errMessage: "Something went wrong",
                    });
                });
        }
    }
    componentDidMount() {
        console.log("ResetPwd just mounted");
    }

    determineViewToRender() {
        // this method determines what the render!
        if (this.state.view === 1) {
            return (
                <>
                    <h1>Reset Password</h1>
                    {this.state.error && (
                        <h2 style={{ color: "red" }}>
                            {this.state.errMessage}
                        </h2>
                    )}
                    <section>
                        <form className="regOrLoginForm">
                            <div className="infoMessagesGrid">
                                Please provide the email address with which you
                                registered
                            </div>
                            <div>
                                <label htmlFor="email">
                                    Email<a className="asterics">*</a>
                                </label>
                                <input
                                    name="email"
                                    onChange={this.handleChange}
                                    key="email"
                                />
                            </div>
                            <div></div>
                            <button
                                className="buttonStyle"
                                onClick={(e) => this.handleSubmit(e)}
                            >
                                Submit
                            </button>
                        </form>
                    </section>
                </>
            );
        } else if (this.state.view === 2) {
            return (
                <>
                    <h1>Reset Password</h1>
                    {this.state.error && (
                        <h2 style={{ color: "red" }}>
                            {this.state.errMessage}
                        </h2>
                    )}
                    <section>
                        <form className="regOrLoginForm">
                            <div className="infoMessagesGrid">
                                Please enter the code you received
                            </div>
                            <div>
                                <label htmlFor="code">
                                    Code<a className="asterics">*</a>
                                </label>
                                <input
                                    name="code"
                                    onChange={this.handleChange}
                                    key="code"
                                />
                            </div>
                            <div></div>
                            <div className="infoMessagesGrid">
                                Please enter a new password
                            </div>
                            <div>
                                <label htmlFor="password">
                                    Password<a className="asterics">*</a>
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    onChange={this.handleChange}
                                    key="password"
                                />
                            </div>
                            <div></div>
                            <button
                                className="buttonStyle"
                                onClick={(e) => this.handleSubmit(e)}
                            >
                                Submit
                            </button>
                        </form>
                    </section>
                </>
            );
        } else if (this.state.view === 3) {
            return (
                <>
                    <h1>Success!</h1>
                    <div className="infoMessagesGrid">
                        You can now{" "}
                        <Link className="chatName" to="/login">
                            log in
                        </Link>{" "}
                        with your new password
                    </div>
                </>
            );
        }
    }

    render() {
        return <>{this.determineViewToRender()}</>;
    }
}
