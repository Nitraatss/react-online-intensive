//Core
import React, { Component } from "react";
import { Transition } from "react-transition-group";
import { fromTo } from "gsap";
import cx from "classnames";

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
                    <button>
                        <img src = { avatar } />
                        <span>{`${currentUserFirstName}`}</span>
                        &nbsp;
                        <span>{`${currentUserLastName}`}</span>
                    </button>
                </section>
            </Transition>
        );
    }
}

export default withProfile(StatusBar);
