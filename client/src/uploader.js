import { Component } from "react";
import axios from "axios";
import AvatarEditor from "react-avatar-editor";

export default class Uploader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            src: null,
            scale: 1,
            rotate: 0,
            error: false,
            errMessage: "",
            uploadText: "Choose a photo",
        };
        console.log("props in Uploader: ", props);
        this.handleChange = this.handleChange.bind(this);
        this.setEditorRef = this.setEditorRef.bind(this);
    }

    componentDidMount() {
        console.log("Uploader mounted!!!");
    }

    handleFileSelection({ target }) {
        if (target.files.length > 0) {
            const fileReader = new FileReader();
            fileReader.onloadend = () => {
                this.setState({ src: fileReader.result });
            };
            if (target.files[0].size >= 2097152) {
                this.setState({
                    error: true,
                    errMessage: "Please select a file less than 2Mb",
                    uploadText: "Choose a photo",
                });
            } else {
                this.setState({
                    error: false,
                    errMessage: "",
                    uploadText:
                        target.value.split("\\").pop().length < 10
                            ? target.value.split("\\").pop()
                            : target.value.split("\\").pop().substring(0, 10) +
                              " ...",
                });
                fileReader.readAsDataURL(target.files[0]);
            }
        }
    }

    stopPropagation(e) {
        e.stopPropagation();
    }

    handleChange({ target }) {
        // updating state!
        this.setState({
            [target.name]: parseFloat(target.value),
        });
    }

    async handleSave(e) {
        e.preventDefault();
        this.props.toggleMethod();
        try {
            const canvas = this.editor.getImage().toDataURL();
            const res = await fetch(canvas);
            const blob = await res.blob();
            const file = new File([blob], "cropped.jpg", {
                type: "image/jpeg",
                lastModified: new Date(),
            });
            var formData = new FormData();
            formData.append("user", this.props.userId);
            formData.append("file", file);
            this.props.loaderinApp(true);
            const resp = await axios.post("/upload", formData);
            this.props.updateImgMethod(resp.data.imgUrl);
            this.props.loaderinApp(false);
        } catch (err) {
            console.log("Err in axios get /user: ", err);
        }
    }

    setEditorRef(editor) {
        this.editor = editor;
    }

    rotateLeft() {
        this.setState({
            rotate: this.state.rotate - 90,
        });
    }

    rotateRight() {
        this.setState({
            rotate: this.state.rotate + 90,
        });
    }

    render() {
        return (
            <div className="modal">
                <div
                    className="modal-close"
                    onClick={this.props.toggleMethod}
                />
                <div className="modalContainer">
                    <p
                        onClick={this.props.toggleMethod}
                        className="closeButton"
                    >
                        &#x2715;
                    </p>

                    <h2>Want to change your profile pic?</h2>
                    {this.state.error && (
                        <h2 style={{ color: "red" }}>
                            {this.state.errMessage}
                        </h2>
                    )}
                    <input
                        type="file"
                        className="inputfile"
                        id="file"
                        accept="image/*"
                        onChange={(e) => this.handleFileSelection(e)}
                    />
                    <label htmlFor="file">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="17"
                            viewBox="0 0 20 17"
                        >
                            <path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"></path>
                        </svg>
                        <span>{this.state.uploadText}</span>
                    </label>

                    {this.state.src && (
                        <AvatarEditor
                            ref={this.setEditorRef}
                            image={this.state.src}
                            width={250}
                            height={250}
                            border={50}
                            color={[223, 46, 46, 0.2]} // RGBA
                            scale={this.state.scale}
                            rotate={this.state.rotate}
                        />
                    )}
                    {this.state.src && (
                        <>
                            <div className="scaleWrapper">
                                <label className="scale" htmlFor="scale">
                                    Zoom
                                </label>
                                <input
                                    type="range"
                                    id="scale"
                                    className="scale"
                                    name="scale"
                                    min="1"
                                    max="5"
                                    defaultValue="0"
                                    step="0.1"
                                    onChange={this.handleChange}
                                />
                            </div>

                            <div className="rotateButtonsCont">
                                <button
                                    className="rotateButton"
                                    onClick={() => this.rotateLeft()}
                                >
                                    ⟲
                                </button>
                                <button
                                    className="rotateButton"
                                    onClick={() => this.rotateRight()}
                                >
                                    ⟳
                                </button>
                            </div>

                            <button
                                className="buttonStyle small"
                                onClick={(e) => this.handleSave(e)}
                            >
                                Upload
                            </button>
                        </>
                    )}
                </div>
            </div>
        );
    }
}
