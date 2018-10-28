//Core
import React from "react";

import { mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Composer } from "./";

configure({ adapter: new Adapter() });

const props = {
    _createPost:          jest.fn(),
    avatar:               `avatar.png`,
    currentUserFirstName: `FName`,
};

const comment = "Hello there";

const initialState = {
    comment: "",
};

const updatedState = {
    comment,
};

const result = mount(<Composer { ...props } />);

const _submitCommentSpy = jest.spyOn(result.instance(), "_submitComment");
const _handleFormSubmitSpy = jest.spyOn(result.instance(), "_handleFormSubmit");
const _updateCommentSpy = jest.spyOn(result.instance(), "_updateComment");

describe("Composer component", () => {
    test("should have 1 section element", () => {
        expect(result.find("section")).toHaveLength(1);
    });

    test("should have 1 img element", () => {
        expect(result.find("img")).toHaveLength(1);
    });

    test("should have 1 form element", () => {
        expect(result.find("form")).toHaveLength(1);
    });

    test("should have 1 textarea element", () => {
        expect(result.find("textarea")).toHaveLength(1);
    });

    test("should have 1 input element", () => {
        expect(result.find("input")).toHaveLength(1);
    });

    test("should have correct initial state", () => {
        expect(result.state()).toEqual(initialState);
    });

    test("textarea should have correct initial state", () => {
        expect(result.find("textarea").text()).toBe("");
    });

    test("textarea should have correct user name", () => {
        expect(result.find("textarea").prop("placeholder")).toBe(
            `Whats on your mind, FName?`
        );
    });

    test("img should have correct src prop value", () => {
        expect(result.find("img").prop("src")).toBe("avatar.png");
    });

    test("should respond on state update", () => {
        result.setState({
            comment,
        });
        expect(result.state()).toEqual(updatedState);
        expect(result.find("textarea").text()).toBe(comment);

        result.setState({
            comment: "",
        });

        expect(result.state()).toEqual(initialState);
        expect(result.find("textarea").text()).toBe("");
    });

    test("should handle textarea change", () => {
        result.find("textarea").simulate("change", {
            target: {
                value: comment,
            },
        });

        expect(result.find("textarea").text()).toBe(comment);
    });

    test("should handle form submit", () => {
        result.find("form").simulate("submit");

        expect(result.state()).toEqual(initialState);
    });

    test("should submit form on input click", () => {
        result.find("input").simulate("click");

        expect(_submitCommentSpy).toHaveBeenCalledTimes(1);
        expect(result.state()).toEqual(initialState);
    });

    test("should handle form submit on Enter key press", () => {
        result.find("form").simulate("keyDown", {
            target: {
                keyCode: 13,
                which:   13,
                key:     "enter",
            },
        });

        expect(result.state()).toEqual(initialState);
    });

    test("_updateComment prop should be invoked  on form change", () => {
        result.find("textarea").simulate("change", {
            target: {
                value: comment,
            },
        });

        expect(_updateCommentSpy).toHaveBeenCalled();
        expect(result.find("textarea").text()).toBe(comment);
    });

    test("_createPost prop should be invoked  after form submit", () => {
        expect(props._createPost).toHaveBeenCalled();
        expect(props._createPost).toHaveBeenCalledTimes(1);
    });

    test("_submitComment and _handleFormSubmit class methods should be invoked once after form is submitted", () => {
        expect(_submitCommentSpy).toHaveBeenCalledTimes(1);
        expect(_handleFormSubmitSpy).toHaveBeenCalledTimes(1);
    });
});
