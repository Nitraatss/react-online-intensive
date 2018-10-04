//Core
import React, { Component } from 'react';

// Components
import Composer from 'components/Composer';
import Post from 'components/Post';
import StatusBar from 'components/StatusBar';
import Spinner from 'components/Spinner';

import Styles from './styles.m.css';

export default class Feed extends Component {
    state = {
        spinnerState: true,
        posts: [
            {
                id: '123',
                comment: 'Hello there!',
                created: 1538471201
            },
            {
                id: '456',
                comment: 'General Kenobi...',
                created: 1538471222
            }
        ]
    }

    render () {
        const posts = this.state.posts;
        const spinnerState = this.state.spinnerState;

        const postsJSX = posts.map((post) => {
            return <Post { ...post } />
        });

        return (
            <section className = { Styles.feed }>
                <Spinner isSpinning = { spinnerState } />
                <StatusBar />
                <Composer />
                {postsJSX}
            </section>
        );
    }
}
