import { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export class Registration extends Component {
    constructor() {
        super();
        this.state = {
            error: false,
            errMessage: "",
        };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange({ target }) {
        this.setState({
            [target.name]: target.value,
        });
    }
    handleSubmit(e) {
        e.preventDefault();

        axios
            .post("/api/register", this.state)
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
                console.log("something went wrong in POST /register", err);
                this.setState({
                    error: true,
                    errMessage: "Something went wrong",
                });
            });
    }

    render() {
        return (
            <>
                <h1>Welcome!</h1>
                {this.state.error && (
                    <h2 style={{ color: "red" }}>{this.state.errMessage}</h2>
                )}
                <section>
                    <form className="regOrLoginForm">
                        <div>
                            <label htmlFor="first">
                                First Name<a className="asterics">*</a>
                            </label>
                            <input name="first" onChange={this.handleChange} />
                        </div>
                        <div>
                            <label htmlFor="last">
                                Last Name<a className="asterics">*</a>
                            </label>
                            <input name="last" onChange={this.handleChange} />
                        </div>
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
                            Register
                        </button>
                    </form>
                </section>
                <div>
                    Are you already registered?
                    <p>
                        Click{" "}
                        <Link className="chatName" to="/login">
                            here
                        </Link>{" "}
                        to log in!
                    </p>
                </div>
            </>
        );
    }
}
