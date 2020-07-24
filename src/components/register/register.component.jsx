import React, { Component } from 'react';
import '../sign-in/sign-in.styles.css';

class Register extends Component {
    state = {
        registrationPseudo: '',
        registrationPassword: ''
    };

    onInputChange = event => {
        const { value, name } = event.target;
        this.setState({ ...this.state, [name]: value });
    };

    onSubmitRegister = () => {
        fetch('https://mariheck-smartbrain-api.herokuapp.com/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                pseudo: this.state.registrationPseudo,
                password: this.state.registrationPassword
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
                <h2>Register</h2>
                <div>
                    <label htmlFor="pseudo">Pseudo</label>
                    <input
                        type="text"
                        name="registrationPseudo"
                        id="pseudo"
                        onChange={this.onInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="registrationPassword"
                        id="password"
                        onChange={this.onInputChange}
                    />
                </div>
                <div>
                    <button type="submit" onClick={this.onSubmitRegister}>
                        Sign Up
                    </button>
                    <div className="links">
                        <p onClick={() => this.props.onRouteChange('home')}>
                            Enter as visitor
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;
