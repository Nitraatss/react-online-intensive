// Core
import React, { Component } from "react";
import { hot } from "react-hot-loader";
import { Switch, Route, Redirect, PropsRoute } from "react-router-dom";

// Components
import StatusBar from "components/StatusBar";
import Feed from "components/Feed";
import Profile from "components/Profile";
import Login from "components/Login";
import { Provider } from "components/HOC/withProfile";

// Instruments
import avatar from "theme/assets/gwen";

const options = {
    avatar,
    currentUserFirstName: "Василий",
    currentUserLastName:  "Шубин",
};

@hot(module)
export default class App extends Component {
    state = {
        userLogged: false,
    };

    _logInSite = () => {
        console.log(1);
        this.setState({
            userLogged: true,
        });
    };

    _logOutSite = () => {
        this.setState({
            userLogged: false,
        });
    };

    render () {
        const { userLogged } = this.state;

        if (!userLogged) {
            return (
                <Switch>
                    <Route
                        path = '/login'
                        render = { (routeProps) => (
                            <Login _logInSite = { this._logInSite } />
                        ) }
                    />
                    <Redirect to = '/login' />
                </Switch>
            );
        }

        return (
            <Provider value = { options }>
                <StatusBar _logOutSite = { this._logOutSite } />
                <Switch>
                    <Route component = { Feed } path = '/feed' />
                    <Route component = { Profile } path = '/profile' />
                    <Redirect to = '/feed' />
                </Switch>
            </Provider>
        );
    }
}
