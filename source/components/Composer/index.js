//Core
import React, { Component } from 'react';

// Components
import { Consumer } from 'components/HOC/withProfile';

import Styles from './styles.m.css';

export default class Composer extends Component {
    render () {
        return (
            <Consumer>
                {(context) => (
                    <section className = { Styles.composer }>
                        <img src = { context.avatar } />
                        <form>
                            <textarea placeholder = {`Whats on your mind, ${context.currentUserFirstName}?`} />
                            <input type = 'submit' value = 'Post' />
                        </form>
                    </section>
                )}
            </Consumer>
        );
    }
}