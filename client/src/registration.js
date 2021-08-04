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
            .post("/register", this.state)
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
                            <label htmlFor="first">First Name</label>
                            <input
                                name="first"
                                placeholder="First Name"
                                onChange={this.handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="last">Last Name</label>
                            <input
                                name="last"
                                placeholder="Last Name"
                                onChange={this.handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input
                                name="email"
                                placeholder="your@email.com"
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
                            Register
                        </button>
                        <div>
                            Are you already registered?
                            <p>
                                Click to <Link to="/login">here</Link> log in!
                            </p>
                        </div>
                    </form>
                </section>
            </>
        );
    }
}
