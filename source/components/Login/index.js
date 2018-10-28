//Core
import React, { Component } from "react";

import { withProfile } from "components/HOC/withProfile";

class Login extends Component {
    _logInSite = () => {
        this.props._logInSite();
        console.log(2);
    };

    render () {
        return (
            <section>
                <button onClick = { this._logInSite } type = 'button'>
                    Login
                </button>
            </section>
        );
    }
}

export default withProfile(Login);
