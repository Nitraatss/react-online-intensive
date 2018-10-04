//Core
import React, { Component } from "react";
import moment from "moment";

// Components
import Composer from "components/Composer";
import Post from "components/Post";
import StatusBar from "components/StatusBar";
import Spinner from "components/Spinner";

//Instruments
import Styles from "./styles.m.css";
import { getUniqueID } from "instruments";

export default class Feed extends Component {
    constructor () {
        super();

        this._createPost = this._createPost.bind(this);
    }

    state = {
        spinnerState: false,
        posts:        [
            {
                id:      "123",
                comment: "Hello there!",
                created: 1538471201,
            },
            {
                id:      "456",
                comment: "General Kenobi...",
                created: 1538471222,
            }
        ],
    };

    _createPost (comment) {
        const post = {
            id:      getUniqueID(),
            created: moment.now(),
            comment,
        };

        this.setState(({ posts }) => ({
            posts: [post, ...posts],
        }));
    }

    render () {
        const posts = this.state.posts;
        const spinnerState = this.state.spinnerState;

        const postsJSX = posts.map((post) => {
            return <Post { ...post } />;
        });

        return (
            <section className = { Styles.feed }>
                <Spinner spinnerState = { spinnerState } />
                <StatusBar />
                <Composer _createPost = { this._createPost } />
                {postsJSX}
            </section>
        );
    }
}
