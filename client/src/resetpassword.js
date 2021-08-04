import { Component } from "react";
import axios from "axios";

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
        // this.setState({
        //     view: this.state.view + 1,
        // });

        if (this.state.view == 1) {
            axios
                .post("/password/reset/start", this.state)
                .then((resp) => {
                    if (resp.data.success) {
                        this.setState({
                            view: this.state.view + 1,
                        });
                    } else {
                        this.setState({
                            error: true,
                            errMessage: resp.data.errMessage,
                            view: this.state.view + 1,
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
    }
    componentDidMount() {
        console.log("ResetPwd just mounted");
    }

    determineViewToRender() {
        // this method determines what the render!
        if (this.state.view === 1) {
            return (
                <section>
                    <form className="regOrLoginForm">
                        <div className="errWrapper">
                            {this.state.error && (
                                <h2 style={{ color: "red" }}>
                                    {this.state.errMessage}
                                </h2>
                            )}
                        </div>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input
                                name="email"
                                placeholder="your@email.com"
                                onChange={this.handleChange}
                            />
                        </div>
                        <button onClick={(e) => this.handleSubmit(e)}>
                            Submit
                        </button>
                    </form>
                </section>
            );
        } else if (this.state.view === 2) {
            return (
                <section>
                    <form className="regOrLoginForm">
                        <div className="errWrapper">
                            {this.state.error && (
                                <h2 style={{ color: "red" }}>
                                    {this.state.errMessage}
                                </h2>
                            )}
                        </div>
                        <div>
                            <label htmlFor="code">Code</label>
                            <input
                                name="code"
                                placeholder="Code"
                                onChange={this.handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                onChange={this.handleChange}
                            />
                        </div>
                        <button onClick={(e) => this.handleSubmit(e)}>
                            Submit
                        </button>
                    </form>
                </section>
            );
        } else if (this.state.view === 3) {
            // remember to also add a link to login ;)
            return (
                <section>
                    <form className="regOrLoginForm">
                        <div>Success!</div>
                        <div>You can now log in with your new password</div>
                    </form>
                </section>
            );
        }
    }

    render() {
        return <>{this.determineViewToRender()}</>;
    }
}
