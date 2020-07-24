import React from 'react';
import './mentions.styles.css';

const Mentions = () => (
    <main className="mentions">
        <h2>Website presentation</h2>
        <h4>Owner and creator :</h4>
        <p>Marine Heckler, Web Developer - Toulouse, France</p>
        <h4>Host :</h4>
        <p>
            GitHub - 88 Colin P Kelly Jr St, San Francisco, CA 94107, United
            States
        </p>

        <h2>Intellectual property</h2>
        <p>
            This website was developed for training purposes. It is inspired by
            Andrei Neagoie’s React tutorial, from his course « The Complete Web
            Developer in 2020 : Zero to Mastery ». The source code, available on
            GitHub, is free to use.
        </p>

        <h2>Personnal data</h2>
        <p>
            A subscription form to create a personal account and keep track of
            the number of pictures submited is available. This form only
            requests a pseudonym and a password, no personal information is
            needed, the main purpose of this form being the demonstration of the
            use of a database within the project. If you wish to try the app
            without creating an account, just hit the « Enter as visitor » link.
        </p>
    </main>
);

export default Mentions;
