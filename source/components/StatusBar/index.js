//Core
import React, { Component } from "react";
import { Transition } from "react-transition-group";
import { fromTo } from "gsap";
import cx from "classnames";
import { Link } from "react-router-dom";

//Components
import { withProfile } from "components/HOC/withProfile";

//Instruments
import { socket } from "socket/init";
import Styles from "./styles.m.css";

class StatusBar extends Component {
    state = {
        online: false,
    };

    componentDidMount () {
        socket.on("connect", () => {
            this.setState({
                online: true,
            });
        });

        socket.on("disconnect", () => {
            this.setState({
                online: false,
            });
        });
    }

    componentWillUnmount () {
        socket.removeListener("connect");
        socket.removeListener("disconnect");
    }

    _animateStatusBarEnter = (composer) => {
        fromTo(composer, 1, { opacity: 0 }, { opacity: 1 });
    };

    _logOutSite = () => {
        this.props._logOutSite();
    };

    render () {
        const {
            avatar,
            currentUserFirstName,
            currentUserLastName,
        } = this.props;

        const { online } = this.state;

        const statusStyle = cx(Styles.status, {
            [Styles.online]:  online,
            [Styles.offline]: !online,
        });

        const statusMessage = online ? "Online" : "Offline";

        return (
            <Transition
                appear
                in
                onEnter = { this._animateStatusBarEnter }
                timeout = { 1000 }>
                <section className = { Styles.statusBar }>
                    <div className = { statusStyle }>
                        <div>{statusMessage}</div>
                        <span />
                    </div>
                    <Link to = '/profile'>
                        <img src = { avatar } />
                        <span>{`${currentUserFirstName}`}</span>
                    </Link>
                    <Link to = '/feed'>Feed</Link>
                    <button onClick = { this._logOutSite } type = 'button'>
                        Logout
                    </button>
                </section>
            </Transition>
        );
    }
}

export default withProfile(StatusBar);
