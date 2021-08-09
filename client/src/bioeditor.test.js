import BioEditor from "./bioeditor";
import axios from "axios";
import { render, fireEvent } from "@testing-library/react";

jest.mock("axios");

axios.get.mockResolvedValue({
    data: {
        first: "Merle",
        last: "Fischer",
        id: 1,
        url: "someUrl.com",
    },
});

test("When no bio is passed to it, an Add is rendered.", () => {
    const { container } = render(<BioEditor bio={""} />);

    expect(container.querySelector("a").innerHTML).toContain(
        "Add your bio now"
    );
});

test("When no bio is passed to it, an Add is rendered.", () => {
    const { container } = render(<BioEditor bio={"This is my bio"} />);
    expect(container.querySelector("a").innerHTML).toContain("Edit");
});

//in my case it is Close, as my button switches to Save only if text was changed in textarea

test("Click on Add or Edit causes a textarea and Close button to be rendered", () => {
    const { container } = render(<BioEditor bio={"This is my bio"} />);
    fireEvent.click(container.querySelector("a"));

    expect(container.querySelector("textarea")).toBeTruthy();
    expect(container.querySelector("button").innerHTML).toContain("Close");
});

test("Update causes Ajax request", () => {
    const { container } = render(<BioEditor bio={"This is my bio"} />);
    fireEvent.click(container.querySelector("a"));

    expect(container.querySelector("textarea")).toBeTruthy();
    fireEvent.change(container.querySelector("textarea"), {
        target: { value: "test" },
    });
    expect(container.querySelector("button").innerHTML).toContain("Update");
    fireEvent.click(container.querySelector("button"));
    axios.post.mockResolvedValue({
        data: {
            bio: "test",
        },
    });
});
