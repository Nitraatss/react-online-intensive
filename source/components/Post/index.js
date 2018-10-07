//Core
import React, { Component } from "react";
import moment from "moment";
import { string, number, func, array } from "prop-types";

//Components
import { withProfile } from "components/HOC/withProfile";
import Like from "components/Like";

//Instruments
import Styles from "./styles.m.css";

@withProfile
class Post extends Component {
    static propTypes = {
        comment:     string.isRequired,
        created:     number.isRequired,
        _likePost:   func.isRequired,
        _deletePost: func.isRequired,
        likes:       array.isRequired,
        id:          string.isRequired,
    };

    _deletePost = () => {
        const { _deletePost, id } = this.props;

        _deletePost(id);
    };

    render () {
        const { comment, created, _likePost, id, likes } = this.props;
        const {
            avatar,
            currentUserFirstName,
            currentUserLastName,
        } = this.props;

        return (
            <section className = { Styles.post }>
                <span className = { Styles.cross } onClick = { this._deletePost } />
                <img src = { avatar } />
                <a>{`${currentUserFirstName} ${currentUserLastName}`}</a>
                <time>{moment.unix(created).format("MMMM D h:mm:ss a")}</time>
                <p>{comment}</p>
                <Like _likePost = { _likePost } id = { id } likes = { likes } />
            </section>
        );
    }
}

export default withProfile(Post);
