//Core
import React, { Component } from "react";

// Components
import { withProfile } from "components/HOC/withProfile";

//Instruments
import Styles from "./styles.m.css";

class Profile extends Component {
    render () {
        const {
            currentUserFirstName,
            currentUserLastName,
            avatar,
        } = this.props;

        return (
            <section className = { Styles.profile }>
                <img src = { avatar } />
            </section>
        );
    }
}

export default withProfile(Profile);
