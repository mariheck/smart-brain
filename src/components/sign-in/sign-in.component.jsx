import React, { Component } from 'react';
import './sign-in.styles.css';

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signInPseudo: '',
            signInPassword: ''
        };
    }
    onPseudoChange = event => {
        this.setState({ signInPseudo: event.target.value });
    };

    onPasswordChange = event => {
        this.setState({ signInPassword: event.target.value });
    };

    onSubmitSignIn = () => {
        fetch('http://localhost:3000/signin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                pseudo: this.state.signInPseudo,
                password: this.state.signInPassword
            })
        })
            .then(response => response.json())
            .then(user => {
                if (user.id) {
                    this.props.loadUser(user);
                    this.props.onRouteChange('home');
                }
            });
    };

    render() {
        return (
            <div className="sign-in">
                <h2>Sign In</h2>
                <div>
                    <label htmlFor="pseudo">Pseudo</label>
                    <input
                        type="text"
                        name="pseudo"
                        id="pseudo"
                        onChange={this.onPseudoChange}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        onChange={this.onPasswordChange}
                    />
                </div>
                <div>
                    <button type="submit" onClick={this.onSubmitSignIn}>
                        Sign In
                    </button>
                </div>
            </div>
        );
    }
}

export default SignIn;
