import React, { Component } from 'react';
import './sign-in.styles.css';

class SignIn extends Component {
    state = {
        signInPseudo: '',
        signInPassword: ''
    };

    onInputChange = event => {
        const { value, name } = event.target;
        this.setState({ ...this.state, [name]: value });
    };

    onSubmitSignIn = () => {
        fetch('https://mariheck-smartbrain-api.herokuapp.com/signin', {
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
                    this.props.onSignIn();
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
                        name="signInPseudo"
                        id="pseudo"
                        onChange={this.onInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="signInPassword"
                        id="password"
                        onChange={this.onInputChange}
                    />
                </div>
                <div>
                    <button type="submit" onClick={this.onSubmitSignIn}>
                        Sign In
                    </button>
                    <div className="links">
                        <p onClick={() => this.props.onRouteChange('register')}>
                            Register
                        </p>
                        <p onClick={() => this.props.onRouteChange('home')}>
                            Enter as visitor
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignIn;
