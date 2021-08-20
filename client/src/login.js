import { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export class Login extends Component {
    constructor() {
        super();
        this.state = {
            error: false,
            errMessage: "",
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
            console.log("this.state in Login:", this.state)
        );
    }
    handleSubmit(e) {
        e.preventDefault(); // prevents button from triggering a refresh
        console.log("user clicked login");
        // when the btn gets clicked we want to make an axios request sending
        // over our value of state
        console.log("this.state in login", this.state);
        axios
            .post("/api/login", this.state)
            .then((resp) => {
                if (resp.data.success) {
                    location.replace("/");
                } else {
                    this.setState({
                        error: true,
                        errMessage: resp.data.errMessage,
                    });
                }
            })
            .catch((err) => {
                console.log("something went wrong in POST /login", err);
                this.setState({
                    error: true,
                    errMessage: "Something went wrong",
                });
            });
    }
    componentDidMount() {
        console.log("Login just mounted");
    }

    render() {
        return (
            <>
                <h1>Log in</h1>
                {this.state.error && (
                    <h2 style={{ color: "red" }}>{this.state.errMessage}</h2>
                )}
                <section>
                    <form className="regOrLoginForm">
                        <div>
                            <label htmlFor="email">
                                Email<a className="asterics">*</a>
                            </label>
                            <input name="email" onChange={this.handleChange} />
                        </div>
                        <div>
                            <label htmlFor="password">
                                Password<a className="asterics">*</a>
                            </label>
                            <input
                                type="password"
                                name="password"
                                onChange={this.handleChange}
                            />
                        </div>
                        <div></div>
                        <button
                            className="buttonStyle"
                            onClick={(e) => this.handleSubmit(e)}
                        >
                            Log in
                        </button>
                    </form>
                </section>
                <div>
                    Forgot your password?
                    <p>
                        Reset your password{" "}
                        <Link className="chatName" to="/password-reset">
                            here
                        </Link>
                    </p>
                </div>
            </>
        );
    }
}
