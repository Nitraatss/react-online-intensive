//Core
import React, { Component } from "react";
import { Transition } from "react-transition-group";
import { fromTo } from "gsap";

// Components
import { withProfile } from "components/HOC/withProfile";
import Catcher from "components/Catcher";
import Composer from "components/Composer";
import Post from "components/Post";
import StatusBar from "components/StatusBar";
import Spinner from "components/Spinner";
import Postman from "components/Postman";
import Counter from "components/Counter";

//Instruments
import Styles from "./styles.m.css";
import { getUniqueID, delay } from "instruments";
import { api, TOKEN, GROUP_ID } from "config/api";
import { socket } from "socket/init";

class Feed extends Component {
    state = {
        spinnerState: false,
        posts:        [],
    };

    componentDidMount () {
        const { currentUserFirstName, currentUserLastName } = this.props;

        this._fetchPost();
        socket.emit("join", GROUP_ID);

        socket.on("create", (postJSON) => {
            const { data: createdPost, meta } = JSON.parse(postJSON);

            if (
                `${currentUserFirstName} ${currentUserLastName}` !==
                `${meta.authorFirstName} ${meta.authorLastName}`
            ) {
                this.setState(({ posts }) => ({
                    posts: [createdPost, ...posts],
                }));
            }
        });

        socket.on("remove", (postJSON) => {
            console.log(postJSON);
            const { data: removedPost, meta } = JSON.parse(postJSON);

            if (
                `${currentUserFirstName} ${currentUserLastName}` !==
                `${meta.authorFirstName} ${meta.authorLastName}`
            ) {
                this.setState(({ posts }) => ({
                    posts: posts.filter((post) => post.id !== removedPost.id),
                }));
            }
        });

        socket.on("like", (postJSON) => {
            console.log(postJSON);
            const { data: likedPost, meta } = JSON.parse(postJSON);

            if (
                `${currentUserFirstName} ${currentUserLastName}` !==
                `${meta.authorFirstName} ${meta.authorLastName}`
            ) {
                this.setState(({ posts }) => ({
                    posts: posts.map(
                        (post) => post.id === likedPost.id ? likedPost : post
                    ),
                }));
            }
        });
    }

    componentWillUnmount () {
        socket.removeListener("create");
        socket.removeListener("remove");
        socket.removeListener("like");
    }

    _changeSpinnerState = (state) => {
        this.setState({
            spinnerState: state,
        });
    };

    _deletePost = async (id) => {
        this._changeSpinnerState(true);

        const response = await fetch(`${api}/${id}`, {
            method:  "DELETE",
            headers: {
                Authorization: TOKEN,
            },
        });

        const updatedPosts = this.state.posts.filter((post) => post.id !== id);

        this.setState({
            posts: updatedPosts,
        });

        this._changeSpinnerState(false);
    };

    _fetchPost = async () => {
        this._changeSpinnerState(true);

        const response = await fetch(api, {
            method: "GET",
        });

        const { data: posts } = await response.json();

        this.setState({
            posts,
        });

        this._changeSpinnerState(false);
    };

    _createPost = async (comment) => {
        this._changeSpinnerState(true);

        const response = await fetch(api, {
            method:  "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization:  TOKEN,
            },
            body: JSON.stringify({ comment }),
        });

        const { data: post } = await response.json();

        await delay(1200);

        this.setState(({ posts }) => ({
            posts: [post, ...posts],
        }));

        this._changeSpinnerState(false);
    };

    _likePost = async (id) => {
        this._changeSpinnerState(true);

        const response = await fetch(`${api}/${id}`, {
            method:  "PUT",
            headers: {
                Authorization: TOKEN,
            },
        });

        const { data: likedPost } = await response.json();

        this.setState(({ posts }) => ({
            posts: posts.map(
                (post) => post.id === likedPost.id ? likedPost : post
            ),
        }));

        this._changeSpinnerState(false);
    };

    _animateComposerEnter = (composer) => {
        fromTo(
            composer,
            1,
            { opacity: 0, rotationX: 50 },
            { opacity: 1, rotationX: 0 }
        );
    };

    render () {
        const { posts, spinnerState } = this.state;

        const postsJSX = posts.map((post) => {
            return (
                <Catcher>
                    <Post
                        key = { post.id }
                        { ...post }
                        _deletePost = { this._deletePost }
                        _likePost = { this._likePost }
                    />
                </Catcher>
            );
        });

        return (
            <section className = { Styles.feed }>
                <Spinner spinnerState = { spinnerState } />
                <StatusBar />
                <Transition
                    appear
                    in
                    onEnter = { this._animateComposerEnter }
                    timeout = { 1000 }>
                    <Composer _createPost = { this._createPost } />
                </Transition>
                <Transition
                    appear
                    in
                    onEnter = { this._animatePostmanEnter }
                    onEntered = { this._animatePostmanLeaving }
                    timeout = { 3000 }>
                    <Postman />
                </Transition>
                <TransitionGroup>{postsJSX}</TransitionGroup>
                <Counter count = { posts.length } />
            </section>
        );
    }
}

export default withProfile(Feed);
