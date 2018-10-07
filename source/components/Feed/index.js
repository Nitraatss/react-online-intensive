//Core
import React, { Component } from "react";
import moment from "moment";

// Components
import { withProfile } from "components/HOC/withProfile";
import Composer from "components/Composer";
import Post from "components/Post";
import StatusBar from "components/StatusBar";
import Spinner from "components/Spinner";

//Instruments
import Styles from "./styles.m.css";
import { getUniqueID, delay } from "instruments";

@withProfile
class Feed extends Component {
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

    _changeSpinnerState = (state) => {
        this.setState({
            spinnerState: state,
        });
    };

    _deletePost = async (id) => {
        this._changeSpinnerState(true);

        await delay(1200);

        const updatedPosts = this.state.posts;

        const deletablePostIndex = updatedPosts.findIndex((post) => {
            return post.id === id;
        });

        if (deletablePostIndex > -1) {
            updatedPosts.splice(deletablePostIndex, 1);

            this.setState({
                posts: updatedPosts,
            });
        }

        this._changeSpinnerState(false);
    };

    _createPost = async (comment) => {
        this._changeSpinnerState(true);

        const post = {
            id:      getUniqueID(),
            created: moment.now(),
            comment,
            likes:   [],
        };

        await delay(1200);

        this.setState(({ posts }) => ({
            posts: [post, ...posts],
        }));

        this._changeSpinnerState(false);
    };

    _likePost = async (id) => {
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
    };

    render () {
        const { posts, spinnerState } = this.state;

        const postsJSX = posts.map((post) => {
            return (
                <Post
                    key = { post.id }
                    { ...post }
                    _deletePost = { this._deletePost }
                    _likePost = { this._likePost }
                />
            );
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

export default withProfile(Feed);
