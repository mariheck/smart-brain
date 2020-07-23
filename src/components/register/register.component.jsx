import React, { Component } from 'react';
import '../sign-in/sign-in.styles.css';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            registrationName: '',
            registrationPseudo: '',
            registrationPassword: ''
        };
    }

    onNameChange = event => {
        this.setState({ registrationName: event.target.value });
    };

    onPseudoChange = event => {
        this.setState({ registrationPseudo: event.target.value });
    };

    onPasswordChange = event => {
        this.setState({ registrationPassword: event.target.value });
    };

    onSubmitRegister = () => {
        fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: this.state.registrationName,
                pseudo: this.state.registrationPseudo,
                password: this.state.registrationPassword
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
                <h2>Register</h2>
                <div>
                    <label htmlFor="name">First Name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        onChange={this.onNameChange}
                    />
                </div>
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
                    <button type="submit" onClick={this.onSubmitRegister}>
                        Sign Up
                    </button>
                </div>
            </div>
        );
    }
}

export default Register;
