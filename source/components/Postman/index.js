//Core
import React from "react";
import { Transition } from "react-transition-group";
import { fromTo } from "gsap";

// Components
import { withProfile } from "components/HOC/withProfile";

//Instruments
import Styles from "./styles.m.css";

const animatePostmanEnter = (postman) => {
    fromTo(postman, 1, { opacity: 0, x: 100 }, { opacity: 1, x: 0 });
};

const animatePostmanLeaving = (postman) => {
    fromTo(postman, 1, { opacity: 1, x: 0 }, { opacity: 0, x: 100 });
};

const Postman = (props) => {
    return (
        <Transition
            appear
            in
            onEnter = { animatePostmanEnter }
            onEntered = { animatePostmanLeaving }
            timeout = { 3000 }>
            <section className = { Styles.postman }>
                <img src = { props.avatar } />
                <span>Welcome online, {props.currentUserFirstName}</span>
            </section>
        </Transition>
    );
};

export default withProfile(Postman);
