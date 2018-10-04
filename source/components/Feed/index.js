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
import { getUniqueID, delay } from "instruments";

export default class Feed extends Component {
    constructor () {
        super();

        this._createPost = this._createPost.bind(this);
        this._changeSpinnerState = this._changeSpinnerState.bind(this);
        this._likePost = this._likePost.bind(this);
    }

    state = {
        spinnerState: false,
        posts:        [
            {
                id:      "123",
                comment: "Hello there!",
                created: 1538471201,
                likes:   [],
            },
            {
                id:      "456",
                comment: "General Kenobi...",
                created: 1538471222,
                likes:   [],
            }
        ],
    };

    _changeSpinnerState (state) {
        this.setState({
            spinnerState: state,
        });
    }

    async _createPost (comment) {
        this._changeSpinnerState(true);

        const post = {
            id:      getUniqueID(),
            created: moment.now(),
            comment,
        };

        await delay(1200);

        this.setState(({ posts }) => ({
            posts: [post, ...posts],
        }));

        this._changeSpinnerState(false);
    }

    async _likePost (id) {
        const { currentUserFirstName, currentUserLastName } = this.props;

        this._changeSpinnerState(true);

        await delay(1200);

        const newPosts = this.state.posts.map((post) => {
            if (post.id === id) {
                return {
                    ...post,
                    likes: [
                        {
                            id:        getUniqueID(),
                            firstName: currentUserFirstName,
                            lastName:  currentUserLastName,
                        }
                    ],
                };
            }

            return post;
        });

        this.setState({
            posts: newPosts,
        });

        this._changeSpinnerState(false);
    }

    render () {
        const { posts, spinnerState } = this.state;

        const postsJSX = posts.map((post) => {
            return <Post key = { post.id } { ...post } _likePost = { this._likePost } />;
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
