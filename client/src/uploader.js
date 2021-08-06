import { Component } from "react";
import axios from "axios";

export default class Uploader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: "",
        };
        console.log("props in Uploader: ", props);
    }

    componentDidMount() {
        console.log("Uploader mounted!!!");
    }

    async handleFileSelection({ target }) {
        // this is where you'll be doing formdata to send your image to the server!!
        // look back at ib for a nice little refresher.
        // once the img has been successfully added to the db and you get the image back here, you'll want to send the image UP TO APP - you can do so by calling the method in App
        // this method in App was passed down to uploader!
        // also make sure that you hide the uploader!

        var formData = new FormData();
        formData.append("user", this.props.userId);
        formData.append("file", target.files[0]);

        try {
            this.props.loaderinApp(true);
            const resp = await axios.post("/upload", formData);
            console.log(resp.data.imgUrl);
            this.props.updateImgMethod(resp.data.imgUrl);
            this.props.loaderinApp(false);
        } catch (err) {
            console.log("Err in axios get /user: ", err);
        }
    }

    stopPropagation(e) {
        e.stopPropagation();
    }

    render() {
        return (
            <div onClick={this.props.toggleMethod} className="modal">
                <div onClick={this.stopPropagation} className="modalContainer">
                    <p
                        onClick={this.props.toggleMethod}
                        className="closeButton"
                    >
                        X
                    </p>

                    <h2>Want to change your profile pic?</h2>

                    <input
                        type="file"
                        id="file"
                        accept="image/*"
                        onChange={(e) => this.handleFileSelection(e)}
                    />
                </div>
            </div>
        );
    }
}
