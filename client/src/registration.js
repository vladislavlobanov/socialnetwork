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
        console.log("which input is running handleChange?", target.name);
        console.log("value the suer typed:", target.value);
        // updating state!
        this.setState(
            {
                [target.name]: target.value,
            },
            console.log("this.state in Registration:", this.state)
        );
    }
    handleSubmit(e) {
        e.preventDefault(); // prevents button from triggering a refresh
        console.log("user clicked register");
        // when the btn gets clicked we want to make an axios request sending
        // over our value of state
        console.log("this.state in Register", this.state);
        axios
            .post("/api/register", this.state)
            .then((resp) => {
                if (resp.data.success) {
                    location.reload();
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
    componentDidMount() {
        console.log("Register just mounted");
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
                        Click to <Link to="/login">here</Link> log in!
                    </p>
                </div>
            </>
        );
    }
}
